--crypto_price_history timescaledb params
SELECT create_hypertable('crypto_price_history', 'recorded_at','crypto_id',5);

ALTER TABLE crypto_price_history SET (
    timescaledb.compress,
    timescaledb.compress_orderby = 'recorded_at DESC',
    timescaledb.compress_segmentby = 'crypto_id'
    );

SELECT add_compression_policy('crypto_price_history', INTERVAL '7 days');



--alerts timescaledb params
SELECT create_hypertable('alerts', 'created_at','user_id',5);

ALTER TABLE alerts SET (
    timescaledb.compress,
    timescaledb.compress_orderby = 'created_at DESC',
    timescaledb.compress_segmentby = 'symbol'
    );

SELECT add_compression_policy('alerts', INTERVAL '7 days');


SELECT add_retention_policy('alerts', INTERVAL '3 months');
