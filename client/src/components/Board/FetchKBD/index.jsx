const FetchKBD = async (board_id) => {
  try {
    const response = await fetch(
      `https://built-differently-backend.onrender.com//kanban-boards/${board_id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default FetchKBD;
