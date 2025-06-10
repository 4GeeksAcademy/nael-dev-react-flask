export const initialStore=()=>{
  return{
    message: null,
    user: null,
    todos: [ ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      case "set_user":
        const {user}= action.payload;
        return{
          ...store,
          user
        }
    default:
      throw Error('Unknown action.');
  }    
}
