const send = require('@polka/send-type');

export async function post(req, res) {
  try {
    res.setHeader('Set-Cookie', ['token ='], {
      maxAge: 0,
      httpOnly: true,
    });
    send(res, 200);
  } catch (error) {
    if (error instanceof Error) {
      return send(res, 400, { error: error.message });
    }
    send(res, 500, { error: error.message });
  }
}
