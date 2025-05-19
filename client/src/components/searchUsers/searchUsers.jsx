import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from 'lodash.debounce';
import { searchUsers, clearSearchUsers } from "../../features/search/usersSlice";
import OtherProfile from "./otherProfile";
import './searchUser.css';

const SearchUsers = () => {
  const [searchInp, setSearchInp] = useState('');
  const [select, setSelect] = useState(null);
  const { searchUsersResult, isLoading, error } = useSelector((state) => state.searchUsers);
  const dispatch = useDispatch();

  const debouncedSearch = useRef(
    debounce((query) => {
      if (query.trim()) {
        dispatch(searchUsers(query));
      } else {
        dispatch(clearSearchUsers()); 
        setSelect(null);             
      }
    }, 300)
  ).current;

  useEffect(() => {
  debouncedSearch(searchInp); 
  return () => debouncedSearch.cancel();
  }, [searchInp, debouncedSearch]);

  const handleClear = () => {
    setSearchInp('');
    dispatch(clearSearchUsers());
    setSelect(null);
  };

  return (
    <div className="search-container">
      <input
        className="search-input" 
        type="text"
        placeholder="Search users..."
        value={searchInp}
        onChange={(e) => setSearchInp(e.target.value)}
      />
      
      {isLoading && <div>Loading...</div>}
      
      {error && <p>{error}</p>}
      <button onClick={() => handleClear()}>x</button>
      {searchUsersResult?.length > 0 && (
        <ul className="other-profiles_list">
          {searchUsersResult.map((user) => (
            <li onClick={() => setSelect(user)} key={user.id}>{user.username}</li>
          ))}
        </ul>
      )}
      {select && <OtherProfile key={select.id} user={select} removeUser={setSelect} />}
    </div>
  );
};

export default SearchUsers;