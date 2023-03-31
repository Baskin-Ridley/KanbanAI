import React, { useEffect, useState } from 'react';
import "../../index.css"

export const GitCard = () => {
  const [commits, setCommits] = useState(undefined);
  const [states, setStates] = useState(false);
  const [user, setUser] = useState('');
  const [repo, setRepo] = useState('');

  const clickHandler = states => {
    setStates(!states);
  };

  const nameHandler = e => {
    setUser(e.target.value);
  };
  const repoHandler = e => {
    setRepo(e.target.value);
  };

  useEffect(() => {
    async function loadCommits() {
      try {
        const response = await fetch(`https://api.github.com/repos/${user}/${repo}/commits`);
        const data = await response.json();
        setCommits(data);
      } catch (error) {
        console.log('There was an error', error);
      }
    }
    loadCommits();
  }, [states]);

  const gitCommitCard = data => {
    return (
      <div className='stackContainer min-h-20 rounded-lg border-dashed border-transparent bg-blue-100 p-2 transition-colors duration-150 hover:border-gray-400 hover:bg-blue-200'>
        <div>
          {Object.keys(data).map((e, i) => (
            <div className='stackCard mb-2 rounded-md bg-blue-50 py-2 px-4 text-md text-center shadow-md border-gray-400 transition-colors duration-150 hover:bg-blue-300 hover:text-white false mt-2'>
              <li key={i}>
                {' '}
                author:{' '}
                {data[e].author ? (
                  <a href={data[e].author.html_url}>{data[e].author.login} </a>
                ) : (
                  'System Merge'
                )}{' '}
              </li>
              <li>
                {' '}
                {data[e].parents ? (
                  <a href={data[e].parents[0].html_url} target="_blank"
                    rel="noreferrer">
                    {' '}
                    commit: {data[e].commit.message}{' '}
                  </a>
                ) : (
                  'missing parent repository'
                )}{' '}
              </li>
              {data[e].author ? (
                <li>
                  {' '}
                  at: {data[e].commit.author.date.slice(11, 16)} day:{' '}
                  {data[e].commit.author.date.slice(0, 10)}{' '}
                </li>
              ) : (
                <li>missing author for the commit</li>
              )}
            </div>
          ))}
        </div>
        <button className='remove-stack-view bg-blue-500 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none hover:bg-blue-200 hover:text-black w-full mt-2' onClick={() => clickHandler(states)}>
          back
        </button>
      </div>
    );
  };

  return (
    <>
      <div className='parent-container-stack m-2 w-64 rounded-lg border border-gray-400 bg-blue-50 px-2 py-3 absolute bottom-40 right-40'>
        <form>
          <label>
            <div className='input-section-stack block color-text-4 font-bold mb-4 text-center'>
              Name:
              <br />
              <input autocomplete="off" className='input-line-stack block appearance-none w-full bg-blue-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-none h-auto' type='text' name='name' onChange={nameHandler} />
            </div>
          </label>
          <label>
            <div className='input-section-stack block color-text-4 font-bold mb-4 text-center'>
              Repository:
              <br />
              <input
                className='input-line-stack block appearance-none w-full bg-blue-100 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 resize-none h-auto'
                type='text'
                name='repository'
                onChange={repoHandler}
              />
            </div>
          </label>
        </form>
        <button className='bg-blue-500 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none hover:bg-blue-200 hover:text-black undefined' id='commit-btn' onClick={() => clickHandler(states)}>
          Get commits
        </button>

      </div>
      <div className='stack-opener'>
        {states ? <ul>{commits && gitCommitCard(commits)}</ul> : null}
      </div>
    </>
  );
}
