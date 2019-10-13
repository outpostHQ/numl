# State system

There is a way to specify separate attribute value for various element states like `:hover`, `:active` etc.

```html
<nu-card
  color="text :hover[special]">
  Card text
</nu-card>
```

It will create hover effect with text color changing.

You can use state of any parent to specify attribute value:

```html
<nu-card id="parent">
  <nu-block color="text #parent:hover[special]">
    Card text
  </nu-block>
</nu-card>
```

And you can use short syntax for the direct parent:

```html
<nu-card>
  <nu-block color="text ^:hover[special]">
    Card text
  </nu-block>
</nu-card>
``` 

## Under the hood

Let's take a look at generated CSS for the first example:

```css
nu-card:not(:hover) {
  color: var(--nu-theme-color);
}

nu-card:hover {
  color: var(--nu-theme-special-color);
}
```

As you see NUDE created selectors automatically. But what if we complicate the task.

```html
<nu-card
  color="text :hover[hover] :focus[focus] :hover:focus[special]">
  Card text
</nu-card>
```

... and resulted CSS:

```css
nu-card:not(:hover):not(:focus) {
  color: var(--nu-theme-color);
}

nu-card:hover:not(:focus) {
  color: var(--nu-theme-hover-color);
}

nu-card:not(:hover):focus {
  color: var(--nu-theme-focus-color);
}

nu-card:hover:focus {
  color: var(--nu-theme-special-color);
}
```

So as you see NUDE did tremendous work to create exclusive selectors.
