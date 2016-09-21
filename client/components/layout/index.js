import { model, List } from '/client/components/posts'

Components.App = () => <div>
  <ul>
    <li>
      <a href="/">home</a>
    </li>

    <li>
      <a href="/other">other</a>
    </li>
  </ul>
  <List model={model} />
</div>
