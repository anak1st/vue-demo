from apscheduler.job import Job
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.schedulers.base import BaseScheduler
from apscheduler.triggers.interval import IntervalTrigger


scheduler = AsyncIOScheduler()


def get_job_interval(job: Job) -> float:
    """
    获取任务的间隔时间（秒）
    """
    trigger: IntervalTrigger = job.trigger
    return trigger.interval.total_seconds()
