from typing import List, Dict
import logging
logger = logging.getLogger(__name__)
import time
import datetime
import pytz
import asyncio
import psutil
from scheduler import scheduler
import influxdbc
from config import cfg


def get_cpu_usage() -> float:
    return psutil.cpu_percent(interval=0.5)


def get_memory_usage() -> float:
    return psutil.virtual_memory().percent


async def async_get_cpu_usage():
    return await asyncio.to_thread(get_cpu_usage)


async def async_get_memory_usage():
    return await asyncio.to_thread(get_memory_usage)


def report_system_status(cpu_usage, memory_usage):
    point = (
        influxdbc.Point("system_status")
        .tag("host", "localhost")
        .field("cpu_usage", cpu_usage)
        .field("memory_usage", memory_usage)
    )
    try:
        influxdbc.write_api.write(bucket=cfg.influxdb.bucket, record=point)
    except Exception as e:
        logger.error(f"Report to influxdb failed, please check your influxdb config")
        logger.error(e)


async def async_report_system_status():
    cpu_usage, memory_usage = await asyncio.gather(async_get_cpu_usage(), 
                                                   async_get_memory_usage())
    await asyncio.to_thread(report_system_status, cpu_usage, memory_usage)


def add_schedule_task():
    scheduler.add_job(async_report_system_status, "interval", seconds=1, max_instances=3)


add_schedule_task()


async def get_system_status(second = 10, aggregate_window = None):
    """
    获取系统状态
    :param second: 秒数
    :param aggregate_window: 聚合窗口，单位秒
    :return: 系统状态列表
    """

    query = f"from(bucket: \"{cfg.influxdb.bucket}\") " \
            f"|> range(start: -{second}s) " \
            f"|> filter(fn: (r) => r.host == \"localhost\") "
    
    if aggregate_window is not None:
        query += f"|> aggregateWindow(every: {aggregate_window}s, fn: mean) "

    response = await asyncio.to_thread(influxdbc.query_api.query, query)
    
    results = {}
    for table in response:
        for record in table.records:
            timestamp: datetime.datetime = record.get_time()
            shanghai_timezone = pytz.timezone('Asia/Shanghai')
            shanghai_timestamp = timestamp.astimezone(shanghai_timezone)
            result = {
                "value": record.get_value(),
                "timestamp": timestamp.timestamp(),
                "localtime": shanghai_timestamp.strftime("%Y/%m/%d %H:%M:%S")
            }
            if result["value"] is None:
                result["value"] = 0.0
            if record.get_field() not in results:
                results[record.get_field()] = []
            results[record.get_field()].append(result)

    # last record is not complete, so delete it
    for key in results:
        if len(results[key]) > 0:
            results[key].pop()

    return results
