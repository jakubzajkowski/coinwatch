-- Users Table
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       first_name VARCHAR(255) NOT NULL,
                       last_name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       date_of_birth DATE NOT NULL,
                       phone_number VARCHAR(255),
                       country VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       preferred_currency VARCHAR(255) NOT NULL,
                       experience_level VARCHAR(255) NOT NULL,
                       agreed_to_terms BOOLEAN NOT NULL,
                       receive_updates BOOLEAN,
                       CONSTRAINT experience_level_enum CHECK (experience_level IN ('BEGINNER', 'INTERMEDIATE', 'EXPERT'))
);

-- User Interests Table
CREATE TABLE user_interests (
                                user_id BIGINT,
                                interests VARCHAR(255) NOT NULL,
                                CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Crypto Currencies Table
CREATE TABLE crypto_currencies (
                                   id BIGSERIAL PRIMARY KEY,
                                   crypto_id VARCHAR(100) NOT NULL UNIQUE,  -- Reduced length for better efficiency
                                   symbol VARCHAR(50) NOT NULL,  -- No change; symbol length seems fine
                                   name VARCHAR(255) NOT NULL,
                                   image_url VARCHAR(255),
                                   current_price NUMERIC(20, 2),
                                   market_cap BIGINT,
                                   market_cap_rank INT,
                                   fully_diluted_valuation BIGINT,
                                   total_volume BIGINT,
                                   high_24h NUMERIC(20, 2),
                                   low_24h NUMERIC(20, 2),
                                   price_change_24h NUMERIC(20, 2),
                                   price_change_percentage_24h NUMERIC(20, 2),
                                   market_cap_change_24h BIGINT,
                                   market_cap_change_percentage_24h NUMERIC(20, 2),
                                   circulating_supply BIGINT,
                                   total_supply BIGINT,
                                   max_supply BIGINT,
                                   ath NUMERIC(20, 2),
                                   ath_change_percentage NUMERIC(20, 2),
                                   ath_date TIMESTAMPTZ,
                                   atl NUMERIC(20, 2),
                                   atl_change_percentage NUMERIC(20, 2),
                                   atl_date TIMESTAMPTZ,
                                   last_updated TIMESTAMPTZ
);

-- Subscriptions Table
CREATE TABLE subscriptions (
                               id BIGSERIAL PRIMARY KEY,
                               user_id BIGINT NOT NULL,
                               crypto_id BIGINT NOT NULL,
                               subscription_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               CONSTRAINT fk_subscription_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                               CONSTRAINT fk_subscription_crypto FOREIGN KEY (crypto_id) REFERENCES crypto_currencies(id) ON DELETE CASCADE
);

-- Global Market Table
CREATE TABLE global_market (
                               id BIGSERIAL PRIMARY KEY,
                               active_cryptocurrencies INT NOT NULL,
                               upcoming_icos INT NOT NULL,
                               ongoing_icos INT NOT NULL,
                               ended_icos INT NOT NULL,
                               markets INT NOT NULL,
                               market_cap_change_percentage_24h_usd DOUBLE PRECISION NOT NULL,
                               updated_at BIGINT NOT NULL
);

-- Total Market Cap Table
CREATE TABLE total_market_cap (
                                  global_market_id BIGINT,
                                  currency VARCHAR(255) NOT NULL,
                                  amount DOUBLE PRECISION NOT NULL,
                                  CONSTRAINT fk_global_market FOREIGN KEY (global_market_id) REFERENCES global_market(id) ON DELETE CASCADE
);

-- Total Volume Table
CREATE TABLE total_volume (
                              global_market_id BIGINT,
                              currency VARCHAR(255) NOT NULL,
                              amount DOUBLE PRECISION NOT NULL,
                              CONSTRAINT fk_total_volume_global_market FOREIGN KEY (global_market_id) REFERENCES global_market(id) ON DELETE CASCADE
);

-- Market Cap Percentage Table
CREATE TABLE market_cap_percentage (
                                       global_market_id  BIGINT,
                                       currency VARCHAR(255) NOT NULL,
                                       percentage DOUBLE PRECISION NOT NULL,
                                       CONSTRAINT fk_market_cap_percentage_global_market FOREIGN KEY (global_market_id) REFERENCES global_market(id) ON DELETE CASCADE
);

-- Crypto Price History Table with recorded_at as part of the composite primary key
CREATE TABLE crypto_price_history (
                                      id BIGSERIAL,
                                      crypto_id VARCHAR(255) NOT NULL,
                                      symbol VARCHAR(50) NOT NULL,
                                      price NUMERIC(19, 8) NOT NULL,
                                      recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create Index for Recorded Time
CREATE INDEX idx_recorded_at_time ON crypto_price_history(recorded_at);

CREATE TABLE alerts (
                        id BIGSERIAL,
                        user_id BIGINT NOT NULL,
                        symbol VARCHAR(50) NOT NULL,
                        crypto_currency_id BIGINT NOT NULL,
                        change_percent NUMERIC(20, 2),
                        old_price NUMERIC(20, 2),
                        new_price NUMERIC(20, 2),
                        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                        CONSTRAINT fk_alert_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                        CONSTRAINT fk_alert_crypto FOREIGN KEY (crypto_currency_id) REFERENCES crypto_currencies(id) ON DELETE CASCADE
);

-- Create Index on created_at for performance
CREATE INDEX idx_alerts_created_at ON alerts(created_at);
