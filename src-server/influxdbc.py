import os
import time
import influxdb_client
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
from config import cfg


client = influxdb_client.InfluxDBClient(url=cfg.influxdb.url, 
                                        token=cfg.influxdb.token, 
                                        org=cfg.influxdb.org)


write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()
