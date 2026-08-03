CREATE DATABASE IF NOT EXISTS product_aggregator_mvp
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE product_aggregator_mvp;

CREATE TABLE IF NOT EXISTS brands (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(140) NOT NULL,
    description TEXT NULL,
    logo_url VARCHAR(1000) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_brands_name UNIQUE (name),
    CONSTRAINT uq_brands_slug UNIQUE (slug),
    INDEX idx_brands_active_name (is_active, name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT UNSIGNED NULL,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(140) NOT NULL,
    description TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_categories_slug UNIQUE (slug),
    CONSTRAINT fk_categories_parent
        FOREIGN KEY (parent_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_categories_parent (parent_id),
    INDEX idx_categories_active_name (is_active, name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS merchants (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(170) NOT NULL,
    website_url VARCHAR(1000) NOT NULL,
    logo_url VARCHAR(1000) NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_merchants_name UNIQUE (name),
    CONSTRAINT uq_merchants_slug UNIQUE (slug),
    INDEX idx_merchants_active_name (is_active, name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    brand_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL,
    short_description VARCHAR(500) NULL,
    description TEXT NOT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_products_slug UNIQUE (slug),
    CONSTRAINT fk_products_brand
        FOREIGN KEY (brand_id)
        REFERENCES brands(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_products_brand (brand_id),
    INDEX idx_products_category (category_id),
    INDEX idx_products_status_date (is_active, published_at),
    INDEX idx_products_featured (is_active, is_featured)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS product_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(1000) NOT NULL,
    alt_text VARCHAR(255) NOT NULL,
    display_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_images_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_product_images_order (product_id, display_order),
    INDEX idx_product_images_primary (product_id, is_primary)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS offers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT UNSIGNED NOT NULL,
    merchant_id BIGINT UNSIGNED NOT NULL,
    external_product_id VARCHAR(255) NULL,
    price DECIMAL(12,2) NULL,
    previous_price DECIMAL(12,2) NULL,
    currency CHAR(3) NOT NULL DEFAULT 'BRL',
    availability ENUM(
        'in_stock',
        'out_of_stock',
        'preorder',
        'unknown'
    ) NOT NULL DEFAULT 'unknown',
    destination_url VARCHAR(2000) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_checked_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_offers_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_offers_merchant
        FOREIGN KEY (merchant_id)
        REFERENCES merchants(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_offers_product_active (product_id, is_active),
    INDEX idx_offers_merchant_active (merchant_id, is_active),
    INDEX idx_offers_price (price),
    INDEX idx_offers_availability (availability)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS affiliate_links (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    offer_id BIGINT UNSIGNED NOT NULL,
    public_code CHAR(36) NOT NULL,
    affiliate_url VARCHAR(2000) NOT NULL,
    program_name VARCHAR(160) NULL,
    campaign_name VARCHAR(160) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    starts_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_affiliate_links_public_code UNIQUE (public_code),
    CONSTRAINT fk_affiliate_links_offer
        FOREIGN KEY (offer_id)
        REFERENCES offers(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    INDEX idx_affiliate_links_offer_active (offer_id, is_active),
    INDEX idx_affiliate_links_period (
        is_active,
        starts_at,
        expires_at
    )
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS click_events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    affiliate_link_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    merchant_id BIGINT UNSIGNED NOT NULL,
    source VARCHAR(100) NULL,
    medium VARCHAR(100) NULL,
    campaign VARCHAR(160) NULL,
    referrer_host VARCHAR(255) NULL,
    device_type ENUM(
        'mobile',
        'tablet',
        'desktop',
        'unknown'
    ) NOT NULL DEFAULT 'unknown',
    visitor_token_hash CHAR(64) NULL,
    clicked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_click_events_affiliate_link
        FOREIGN KEY (affiliate_link_id)
        REFERENCES affiliate_links(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_click_events_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_click_events_merchant
        FOREIGN KEY (merchant_id)
        REFERENCES merchants(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_click_events_date (clicked_at),
    INDEX idx_click_events_product_date (product_id, clicked_at),
    INDEX idx_click_events_merchant_date (merchant_id, clicked_at),
    INDEX idx_click_events_campaign_date (campaign, clicked_at)
) ENGINE=InnoDB;


