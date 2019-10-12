# Responsive system

To make your site responsive with NUDE is very simple. Any NUDE Element has `responsive` that can declare responsive points in its context. Every responsive point split a set of screen width values into two zones. So N responsive wil split that set into N + 1 zones. Let's take a look at an example:

```html
<!-- we declare two responsive points -->
<nu-block responsive="980px|640px">
  <!-- we declare three values of attribute for each responsive zone -->
  <nu-badge size="xl|md|sm"></nu-badge>
</nu-block>
```

So here we have three responsive zones and three corresponding value for the attribute:

| Media query | Attribute value |
|--- | --- |
| (min-width: 980px) | xl |
| (max-width: 979px) and (min-width: 640px) | md |
| (max-width: 639px) | xs |

So just in few symbols we created element with responsive size. WOW! It would require a batch of lines in CSS and would be static while NUDE implementation let you dynamically change responsive points which is **impossible in plain CSS**.

### How to skip attribute values

Sometimes there is no need to define all values for the attribute. And there are some tricks to archive that. Here is few example to understand that mechanism. All examples provided for responsive points from the first example.

#### Attribute full value: `xl`

| Media query | Attribute value |
|--- | --- |
| (min-width: 980px) | `xl` |
| (max-width: 979px) and (min-width: 640px) | `xl` |
| (max-width: 639px) | `xl` |

#### Attribute full value: `xl|md`

| Media query | Attribute value |
|--- | --- |
| (min-width: 980px) | `xl` |
| (max-width: 979px) and (min-width: 640px) | `md` |
| (max-width: 639px) | `md` |

#### Attribute full value: `||xs`

| Media query | Attribute value |
|--- | --- |
| (min-width: 980px) | – |
| (max-width: 979px) and (min-width: 640px) | – |
| (max-width: 639px) | `xs` |

#### Attribute full value: `xl||xs`

| Media query | Attribute value |
|--- | --- |
| (min-width: 980px) | `xl` |
| (max-width: 979px) and (min-width: 640px) | xl |
| (max-width: 639px) | `xs` |

#### Attribute full value: `xl| |xs`

To pass empty values use `space` symbol. Like in this example.

| Media query | Attribute value |
|--- | --- |
| (min-width: 980px) | `xl` |
| (max-width: 979px) and (min-width: 640px) | – |
| (max-width: 639px) | `xs` |

## Tips

If you develop site for start you can specify attribute values only for desktop or mobile version. Late you can add responsive points and additional attribute values to make your site responsive. It's super quick and easy!
