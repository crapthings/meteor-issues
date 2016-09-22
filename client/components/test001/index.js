Components.Test001 = () => {

  console.log('only run once')

  const _forms = {
    form1,
    form2,
    form3,
  }

  // if you want to keep state across different routes you might want to use Session
  const _whichForm = new ReactiveVar('form1')

  const _comp = ({form}) => <div>
    <button onClick={() => _whichForm.set('form1')}>form1</button>
    <button onClick={() => _whichForm.set('form2')}>form2</button>
    <button onClick={() => _whichForm.set('form3')}>form3</button>
    {_forms[form]()}
  </div>

  function form1 () {
    return <div>form1</div>
  }

  function form2 () {
    return <div>form2</div>
  }

  function form3 () {
    return <div>form3</div>
  }

  function _tracker (props, onData) {
    const form =  _whichForm.get()
    console.log('rerun: ', form)
    onData(null, { form })
  }

  const comp = Container(_tracker)(_comp)
  return new comp()

  // return new (Container(_tracker)(_comp))()

}
