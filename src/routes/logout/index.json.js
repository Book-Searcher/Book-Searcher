const contentType = { 'Content-Type': 'application/json' };

export async function post(req, res) {
  try {
    res.setHeader('Set-Cookie', ['token ='], {
      maxAge: 0,
      httpOnly: true,
    });
    //todo: token with length 90000 not banned?
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
