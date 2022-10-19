import React, { useState } from 'react';

const AccountsContext = React.createContext([{}, () => {}]);

const AccountsProvider = (props) => {
  const [accounts, setAccounts] = useState([]);
  return (
    <AccountsContext.Provider value={[accounts, setAccounts]}>
      {props.children}
    </AccountsContext.Provider>
  );
};

export {AccountsContext, AccountsProvider};