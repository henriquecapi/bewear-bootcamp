✓ Compiled /favicon.ico in 1443ms (1265 modules)
GET /favicon.ico 200 in 1929ms
○ Compiling /api/auth/[...all] ...
✓ Compiled /api/auth/[...all] in 6s (2088 modules)
<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: invalid stored block lengths
⨯ Error: Failed query: insert into "cart" ("id", "user_id", "shipping_address_id", "created_at") values (default, $1, default,
default) returning "id", "user_id", "shipping_address_id", "created_at"
params: rGvWynOMSK2Tlasakvae3E7k4qJkEc1v
at async getCart (src\actions\get-cart\index.ts:31:22)
29 | });
30 | if (!cart) {

> 31 | const [newCart] = await db

     |                      ^

32 | .insert(cartTable)
33 | .values({
34 | userId: session.user.id, {
query: 'insert into "cart" ("id", "user_id", "shipping_address_id", "created_at") values (default, $1, default, default) returning "id", "user_id", "shipping_address_id", "created_at"',
params: [Array],
digest: '3220178647',
[cause]: error: null value in column "shipping_address_id" of relation "cart" violates not-null constraint
at async getCart (src\actions\get-cart\index.ts:31:22)
29 | });
30 | if (!cart) {

> 31 | const [newCart] = await db

       |                      ^
    32 |       .insert(cartTable)
    33 |       .values({
    34 |         userId: session.user.id, {
    length: 318,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (14a43762-2a35-41cc-9ee0-87ea68affd0f, rGvWynOMSK2Tlasakvae3E7k4qJkEc1v, null, 2025-08-25 13:30:44.810287).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'cart',
    column: 'shipping_address_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '1997',
    routine: 'ExecConstraints'

}
}
POST / 500 in 9663ms
GET /api/auth/get-session 200 in 10735ms
GET / 200 in 898ms
