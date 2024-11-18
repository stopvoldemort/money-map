import logging
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)

def info(message):
    logger.info(message)

def error(message):
    logger.error(message)
