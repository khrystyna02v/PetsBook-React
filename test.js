function Crtest() {
    const contacts = [
      { id: 1, name: "Іван", phone: "123-456" },
      { id: 2, name: "Олена", phone: "987-654" },
    ];
  
    return (
      <div>
        <h2>Список контактів</h2>
        {/* {contacts.map(c => (
          <ContactCard key={c.id} name={c.name} phone={c.phone} />
        ))} */}
      </div>
    );
  }
  

