import logging
import colorlog


formatter = logging.Formatter(
    "{asctime} {levelname:^8s} [{name}] {message}",
    style="{",
    datefmt="%Y-%m-%d %H:%M:%S"
)


formatterColored = colorlog.ColoredFormatter(
    "{log_color}{asctime} {levelname:^8s} [{name}] {message}{reset}",
    log_colors={
        'DEBUG': 'light_black',
        'INFO': 'white',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'CRITICAL': 'red,bg_white',
    },
    style="{",
    datefmt="%Y-%m-%d %H:%M:%S"
)


def config_logger(logger, level):
    logger.setLevel(level)
    streamHandler = logging.StreamHandler()
    streamHandler.setLevel(level)
    streamHandler.setFormatter(formatterColored)
    logger.addHandler(streamHandler)


config_logger(logging.getLogger(), logging.INFO)
logging.getLogger("apscheduler.executors.default").setLevel(logging.WARNING)
