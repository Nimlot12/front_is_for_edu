function Toolbar(props) {
    const onChange = (e) => {
        console.log(`Toolbar: ${e.target.value}`)
        if (props.onChange){
            props.onChange(e.target.value)
        }
    }
    
    return (
        <select className = "form-select" onChange={onChange}>
          <option value = "Администратор">Администраторы</option>
          <option value = "Репетитор">Репетиторы</option>
          <option value = "Ученик">Ученики</option>
        </select>
    );
  }

  export default Toolbar;