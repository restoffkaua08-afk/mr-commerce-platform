-- Normaliza as categorias dos produtos migrados do catalogo legado.
-- A migracao e idempotente e utiliza os slugs como identificadores.

SET NAMES utf8mb4;

START TRANSACTION;

INSERT INTO product_aggregator_mvp.categories (
    parent_id,
    name,
    slug,
    description,
    is_active
)
SELECT
    NULL,
    CONVERT(0x5375C3A97465726573 USING utf8mb4),
    'sueteres',
    CONVERT(0x5375C3A974657265732065207065C3A76173206465206D616C68612070617261206469666572656E746573206F63617369C3B565732E USING utf8mb4),
    TRUE
WHERE NOT EXISTS (
    SELECT 1
    FROM product_aggregator_mvp.categories
    WHERE slug = 'sueteres'
);

UPDATE
    product_aggregator_mvp.products AS product
    INNER JOIN product_aggregator_mvp.categories AS category
        ON category.slug = 'tenis'
SET product.category_id = category.id
WHERE product.slug IN (
    'tenis-nike-air-max-excee-masculino',
    'tenis-nike-sb-force-58-masculino',
    'tenis-adidas-lite-racer-4'
);

UPDATE
    product_aggregator_mvp.products AS product
    INNER JOIN product_aggregator_mvp.categories AS category
        ON category.slug = 'calcas'
SET product.category_id = category.id
WHERE product.slug = 'calca-esportiva-adidas-firebird';

UPDATE
    product_aggregator_mvp.products AS product
    INNER JOIN product_aggregator_mvp.categories AS category
        ON category.slug = 'jaquetas'
SET product.category_id = category.id
WHERE product.slug IN (
    'jaqueta-jeans-adidas-adicolor-firebird',
    'jaqueta-corinthians-nike-total-90'
);

UPDATE
    product_aggregator_mvp.products AS product
    INNER JOIN product_aggregator_mvp.categories AS category
        ON category.slug = 'moletons'
SET product.category_id = category.id
WHERE product.slug = 'moletom-masculino-lacoste-classico';

UPDATE
    product_aggregator_mvp.products AS product
    INNER JOIN product_aggregator_mvp.categories AS category
        ON category.slug = 'sueteres'
SET product.category_id = category.id
WHERE product.slug = 'sueter-masculino-lacoste-malha-regular';

COMMIT;