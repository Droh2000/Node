interface User {
  id: number;
  name: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Doe',
  }
];


export function getUserById( id: number, callback: (err?: string, user?:User) => void ) {
  const user = users.find( function(user){
    return user.id === id;  
  });

  if( !user ) {
    // Hicimos esta modificacion para que la funcion no sea bloquente
    setTimeout(() => {
      callback(`User not found with id ${id}`);
    });

    return;
  }

  return callback( undefined, user );
}


