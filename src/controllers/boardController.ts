export async function getAllBoards(req, res) {
  res.status(200);
  res.json({ message: 'Get All Boards' });
}

export async function getBoard(req, res) {
  const { id } = req.params;
  res.status(200);
  res.json({ message: `Get the ${id} Board` });
}

export async function createBoard(req, res) {
  res.status(200);
  res.json({ message: 'Create a Board' });
}

export async function updateBoard(req, res) {
  const { id } = req.params;
  res.status(200);
  res.json({ message: `Update the ${id} Board` });
}

export async function deleteBoard(req, res) {
  const { id } = req.params;
  res.status(200);
  res.json({ message: `Delete the ${id} Board` });
}
