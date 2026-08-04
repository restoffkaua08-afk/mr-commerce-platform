-- Corrige caracteres substituidos por "?" durante a migracao legada.
-- Os textos sao representados em hexadecimal UTF-8 para evitar
-- dependencia do encoding do terminal ou do cliente SQL.

SET NAMES utf8mb4;

START TRANSACTION;

UPDATE product_aggregator_mvp.brands
SET description = CONVERT(
    0x50726F6475746F73204E696B6520646973706F6EC3AD7665697320656D206C6F6A6173206F666963696169732E
    USING utf8mb4
)
WHERE slug = 'nike';

UPDATE product_aggregator_mvp.brands
SET description = CONVERT(
    0x50726F6475746F732041646964617320646973706F6EC3AD7665697320656D206C6F6A6173206F666963696169732E
    USING utf8mb4
)
WHERE slug = 'adidas';

UPDATE product_aggregator_mvp.brands
SET description = CONVERT(
    0x50726F6475746F73204C61636F73746520646973706F6EC3AD7665697320656D206C6F6A6173206F666963696169732E
    USING utf8mb4
)
WHERE slug = 'lacoste';

UPDATE product_aggregator_mvp.categories
SET
    name = CONVERT(
        0x54C3AA6E6973
        USING utf8mb4
    ),
    description = CONVERT(
        0x54C3AA6E697320636173756169732065206573706F727469766F732E
        USING utf8mb4
    )
WHERE slug = 'tenis';

UPDATE product_aggregator_mvp.categories
SET description = CONVERT(
    0x4A617175657461732065207065C3A76173207061726120736F627265706F7369C3A7C3A36F2E
    USING utf8mb4
)
WHERE slug = 'jaquetas';

UPDATE product_aggregator_mvp.categories
SET
    name = CONVERT(
        0x43616CC3A76173
        USING utf8mb4
    ),
    description = CONVERT(
        0x43616CC3A7617320636173756169732065206573706F7274697661732E
        USING utf8mb4
    )
WHERE slug = 'calcas';

UPDATE product_aggregator_mvp.categories
SET description = CONVERT(
    0x4D6F6C65746F6E732065207065C3A76173206465206D616C68612E
    USING utf8mb4
)
WHERE slug = 'moletons';

COMMIT;