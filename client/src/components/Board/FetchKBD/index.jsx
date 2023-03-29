const FetchKBD = async (board_id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/kanban-boards/${board_id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

export default FetchKBD
