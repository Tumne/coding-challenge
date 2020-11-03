import React, { useEffect, useState } from 'react';
import './App.css';

const App = ({ user }: { user: string }) => {
  const [followers, setFollowers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState(false);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${user}/following`
        );
        if (res.status !== 200) throw new Error(res.statusText);
        const response = await res.json();
        setFollowers(response);
      } catch (err) {
        console.error(err);
      }
    };

    getFollowers();
  }, [user]);

  return (
    <ul className="App">
      {followers.map((item: any) => {
        return (
          <li key={item.id}>
            <p>
              {item.login}{' '}
              <button
                onClick={() => {
                  setSelectedUser(selectedUser === item.id ? null : item.id);
                }}
              >
                load
              </button>
            </p>
            {selectedUser === item.id && <App user={item.login} />}
          </li>
        );
      })}
    </ul>
  );
};

export default App;
