CREATE TABLE user_favorite_cryptos (
                                       id BIGSERIAL PRIMARY KEY,
                                       user_id BIGINT NOT NULL,
                                       crypto_id BIGINT NOT NULL,
                                       added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                                       CONSTRAINT fk_user_fav_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                       CONSTRAINT fk_user_fav_crypto FOREIGN KEY (crypto_id) REFERENCES crypto_currencies(id) ON DELETE CASCADE
);