const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    if (!req.session || !req.session.userId || !req.session.token) {
      res.res.writeHead(401, contentType).end(
        JSON.stringify({
          error: 'Unauthorized',
        })
      );
    }
    req.session.destroy();
    res.writeHead(200).end();
  } catch (error) {
    if (error instanceof Error) {
      res
        .writeHead(400, contentType)
        .end(JSON.stringify({ error: error.message }));
    } else {
      res.writeHead(500, contentType).end(JSON.stringify({ error: error }));
    }
  }
}
