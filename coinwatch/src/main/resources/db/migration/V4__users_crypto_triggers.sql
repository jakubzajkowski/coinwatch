CREATE TABLE users_crypto_triggers (
                                id BIGSERIAL PRIMARY KEY,
                                user_id BIGINT NOT NULL,
                                crypto_currency_id BIGINT NOT NULL,
                                target_price NUMERIC(20, 2) NOT NULL,
                                direction VARCHAR(10) NOT NULL,
                                triggered BOOLEAN DEFAULT FALSE,
                                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

                                CONSTRAINT fk_trigger_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                CONSTRAINT fk_trigger_crypto FOREIGN KEY (crypto_currency_id) REFERENCES crypto_currencies(id) ON DELETE CASCADE
);