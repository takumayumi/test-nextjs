export async function toggleFavorite(id: string, isFavorite: boolean) {
  const res = await fetch(`/api/recipes/${id}/favorite`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isFavorite }),
  });

  if (!res.ok) throw new Error("Failed to update favorite");
  return res.json();
}
