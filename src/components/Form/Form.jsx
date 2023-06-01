const Form = ({ modalHandler, weatherData, inputValue, setInputValue }) => {
  return (
    <form
      className='input w-full flex flex-col gap-4 bg-slate-100 p-4 rounded-4 mt-4'
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputValue) {
          modalHandler('Пожалуйста, ведите название города');
          return;
        } else {
          weatherData(true);
        }
      }}
    >
      <input
        type='text'
        placeholder='Введите название города'
        value={inputValue}
        className='form-control'
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type='submit' className='btn btn-primary'>
        Получить погоду по названию города
      </button>
    </form>
  )
}

export default Form