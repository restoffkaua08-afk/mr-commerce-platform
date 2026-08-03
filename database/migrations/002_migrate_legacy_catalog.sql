USE product_aggregator_mvp;

START TRANSACTION;

INSERT IGNORE INTO brands (
    name,
    slug,
    description,
    is_active
) VALUES
    (
        'Nike',
        'nike',
        'Produtos Nike disponíveis em lojas oficiais.',
        TRUE
    ),
    (
        'Adidas',
        'adidas',
        'Produtos Adidas disponíveis em lojas oficiais.',
        TRUE
    ),
    (
        'Lacoste',
        'lacoste',
        'Produtos Lacoste disponíveis em lojas oficiais.',
        TRUE
    );

INSERT IGNORE INTO categories (
    name,
    slug,
    description,
    is_active
) VALUES
    (
        'Tênis',
        'tenis',
        'Tênis casuais e esportivos.',
        TRUE
    ),
    (
        'Jaquetas',
        'jaquetas',
        'Jaquetas e peças para sobreposição.',
        TRUE
    ),
    (
        'Calças',
        'calcas',
        'Calças casuais e esportivas.',
        TRUE
    ),
    (
        'Moletons',
        'moletons',
        'Moletons e peças de malha.',
        TRUE
    );

INSERT IGNORE INTO merchants (
    name,
    slug,
    website_url,
    is_verified,
    is_active
) VALUES
    (
        'Nike',
        'nike',
        'https://www.nike.com.br/',
        TRUE,
        TRUE
    ),
    (
        'Adidas',
        'adidas',
        'https://www.adidas.com.br/',
        TRUE,
        TRUE
    ),
    (
        'Lacoste',
        'lacoste',
        'https://www.lacoste.com/br/',
        TRUE,
        TRUE
    );

INSERT IGNORE INTO products (
    brand_id,
    category_id,
    name,
    slug,
    short_description,
    description,
    is_featured,
    is_active,
    published_at,
    created_at,
    updated_at
)
SELECT
    b.id,
    c.id,
    legacy.nome,
    CASE legacy.id
        WHEN 1 THEN 'tenis-nike-air-max-excee-masculino'
        WHEN 2 THEN 'tenis-nike-sb-force-58-masculino'
        WHEN 3 THEN 'sueter-masculino-lacoste-malha-regular'
        WHEN 4 THEN 'moletom-masculino-lacoste-classico'
        WHEN 5 THEN 'calca-esportiva-adidas-firebird'
        WHEN 6 THEN 'tenis-adidas-lite-racer-4'
        WHEN 7 THEN 'jaqueta-jeans-adidas-adicolor-firebird'
        WHEN 8 THEN 'jaqueta-corinthians-nike-total-90'
        ELSE CONCAT('produto-', legacy.id)
    END,
    LEFT(legacy.descricao, 240),
    legacy.descricao,
    CASE
        WHEN legacy.id IN (1, 2, 3) THEN TRUE
        ELSE FALSE
    END,
    TRUE,
    legacy.created_at,
    legacy.created_at,
    legacy.created_at
FROM product_aggregator.products AS legacy
INNER JOIN brands AS b
    ON b.name = legacy.marca COLLATE utf8mb4_unicode_ci
INNER JOIN categories AS c
    ON c.slug = CASE
        WHEN legacy.categoria = 'Tênis' THEN 'tenis'
        WHEN legacy.categoria = 'Jaqueta' THEN 'jaquetas'
        WHEN legacy.categoria = 'Calça' THEN 'calcas'
        WHEN legacy.categoria IN ('Moleton', 'Moletom') THEN 'moletons'
        ELSE 'moletons'
    END;

INSERT INTO product_images (
    product_id,
    image_url,
    alt_text,
    display_order,
    is_primary
)
SELECT
    target.id,
    source.image_url,
    source.alt_text,
    source.display_order,
    source.is_primary
FROM (
    SELECT
        legacy.id AS legacy_id,
        legacy.imagem1 AS image_url,
        legacy.nome AS alt_text,
        1 AS display_order,
        TRUE AS is_primary
    FROM product_aggregator.products AS legacy

    UNION ALL

    SELECT
        legacy.id AS legacy_id,
        legacy.imagem2 AS image_url,
        CONCAT(legacy.nome, ' - imagem adicional') AS alt_text,
        2 AS display_order,
        FALSE AS is_primary
    FROM product_aggregator.products AS legacy
) AS source
INNER JOIN products AS target
    ON target.slug = CASE source.legacy_id
        WHEN 1 THEN 'tenis-nike-air-max-excee-masculino'
        WHEN 2 THEN 'tenis-nike-sb-force-58-masculino'
        WHEN 3 THEN 'sueter-masculino-lacoste-malha-regular'
        WHEN 4 THEN 'moletom-masculino-lacoste-classico'
        WHEN 5 THEN 'calca-esportiva-adidas-firebird'
        WHEN 6 THEN 'tenis-adidas-lite-racer-4'
        WHEN 7 THEN 'jaqueta-jeans-adidas-adicolor-firebird'
        WHEN 8 THEN 'jaqueta-corinthians-nike-total-90'
        ELSE CONCAT('produto-', source.legacy_id)
    END
WHERE NOT EXISTS (
    SELECT 1
    FROM product_images AS existing
    WHERE existing.product_id = target.id
      AND existing.image_url = source.image_url COLLATE utf8mb4_unicode_ci
      AND existing.display_order = source.display_order
);

INSERT INTO offers (
    product_id,
    merchant_id,
    price,
    previous_price,
    currency,
    availability,
    destination_url,
    is_active,
    last_checked_at
)
SELECT
    target.id,
    merchant.id,
    NULL,
    NULL,
    'BRL',
    'unknown',
    legacy.link_externo,
    TRUE,
    NULL
FROM product_aggregator.products AS legacy
INNER JOIN products AS target
    ON target.slug = CASE legacy.id
        WHEN 1 THEN 'tenis-nike-air-max-excee-masculino'
        WHEN 2 THEN 'tenis-nike-sb-force-58-masculino'
        WHEN 3 THEN 'sueter-masculino-lacoste-malha-regular'
        WHEN 4 THEN 'moletom-masculino-lacoste-classico'
        WHEN 5 THEN 'calca-esportiva-adidas-firebird'
        WHEN 6 THEN 'tenis-adidas-lite-racer-4'
        WHEN 7 THEN 'jaqueta-jeans-adidas-adicolor-firebird'
        WHEN 8 THEN 'jaqueta-corinthians-nike-total-90'
        ELSE CONCAT('produto-', legacy.id)
    END
INNER JOIN merchants AS merchant
    ON merchant.name = legacy.marca COLLATE utf8mb4_unicode_ci
WHERE NOT EXISTS (
    SELECT 1
    FROM offers AS existing
    WHERE existing.product_id = target.id
      AND existing.merchant_id = merchant.id
      AND existing.destination_url = legacy.link_externo COLLATE utf8mb4_unicode_ci
);

INSERT INTO affiliate_links (
    offer_id,
    public_code,
    affiliate_url,
    program_name,
    campaign_name,
    is_active
)
SELECT
    offer_record.id,
    UUID(),
    offer_record.destination_url,
    NULL,
    'catalogo-inicial',
    TRUE
FROM offers AS offer_record
WHERE NOT EXISTS (
    SELECT 1
    FROM affiliate_links AS existing
    WHERE existing.offer_id = offer_record.id
);

COMMIT;



