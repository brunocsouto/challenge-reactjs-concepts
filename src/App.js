import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [techs, setTechs] = useState();

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  function handleTitle(event) {
    const typedTitle = event.target.value;

    setTitle(typedTitle);
  }

  function handleUrl(event) {
    const typedUrl = event.target.value;

    setUrl(typedUrl);
  }

  function handleTechs(event) {
    const typedTechs = event.target.value;

    const serializedTechs = typedTechs.split(",");

    setTechs(serializedTechs);
  }

  async function handleAddRepository() {
    await api
      .post("repositories", {
        title,
        url,
        techs,
      })
      .then((response) => {
        const repository = response.data;

        setRepositories([...repositories, repository]);
      });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(() => {
      const filteredRepositories = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories(filteredRepositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleTitle} />
        <label htmlFor="url">URL</label>
        <input type="text" id="url" onChange={handleUrl} />
        <label htmlFor="techs">Techs</label>
        <input type="text" id="techs" onChange={handleTechs} />
      </form>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
