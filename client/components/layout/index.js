const Nav = () => <ul>
  <li>
    <a href='/'>home</a>
  </li>

  <li>
    <a href='/authors'>authors</a>
  </li>

  <li>
    <a href='/test001'>dynamic toggle stateless component with meteor tracker</a>
  </li>
</ul>

Components.App = ({content}) => <div>
  <Nav />
  <div>{content()}</div>
</div>
