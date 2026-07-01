# Bootstrap to MUI + Tailwind Migration Rules

## Objective

This document is the implementation guide for replacing Bootstrap and React-Bootstrap patterns with a modern MUI + Tailwind stack. The migration should be deterministic, regex-friendly, and safe for an autonomous agent.

---

## 1. Direct Component Translation Dictionary

### 1.1 Layout and Grid Components

| Bootstrap / React-Bootstrap | Recommended Replacement | Notes |
| --- | --- | --- |
| `<Container>` | `<Container maxWidth="lg">` from MUI or `max-w-7xl mx-auto px-4` with Tailwind | Use MUI for semantic layout shells and Tailwind for spacing |
| `<Row>` | `flex flex-wrap` or `<Grid2 container>` | Prefer Tailwind for simple rows; MUI Grid2 for complex alignment |
| `<Col>` | `w-full md:w-1/2` or `<Grid2 size={{ xs: 12, md: 6 }}>` | MUI Grid2 is the closest equivalent |
| `<Stack gap={...}>` | `flex flex-col gap-*` | Tailwind is fastest for one-dimensional layouts |
| `<Navbar>` | `<AppBar>` + `<Toolbar>` | MUI is better for accessible nav patterns |
| `<Nav>` | `<Stack direction="row">` + `<Button>` or `<Link>` | Use MUI for interactive nav |
| `<Form>` | `<Box component="form">` | Wrap form controls in MUI components |
| `<FormGroup>` | `<Stack>` | Tailwind flex layouts work well here |
| `<Card>` | `<Card>` | Direct MUI equivalent |
| `<Card.Body>` | `<CardContent>` | MUI uses explicit content slots |
| `<Modal>` | `<Dialog>` or `<Modal>` | MUI Dialog is the most accessible choice |
| `<Dropdown>` | `<Menu>` + `<Button>` | MUI Menu is the scalable replacement |
| `<Accordion>` | `<Accordion>` | Direct MUI equivalent |
| `<Tabs>` | `<Tabs>` | Direct MUI equivalent |
| `<Alert>` | `<Alert>` | Direct MUI equivalent |
| `<Spinner>` | `<CircularProgress>` | Better for loading states |
| `<Image>` | `<Box component="img">` or `next/image` | Prefer `next/image` in Next.js |

### 1.2 Buttons and Inputs

| Bootstrap / React-Bootstrap | Recommended Replacement |
| --- | --- |
| `<Button variant="primary">` | `<Button color="primary" variant="contained">` |
| `<Button variant="secondary">` | `<Button color="secondary" variant="outlined">` |
| `<Button variant="outline-*">` | `<Button variant="outlined">` |
| `<Button size="sm">` | `<Button size="small">` |
| `<Button size="lg">` | `<Button size="large">` |
| `<Form.Control>` | `<TextField />` |
| `<Form.Select>` | `<Select />` or `<TextField select />` |
| `<Form.Check>` | `<Checkbox />` or `<Switch />` |
| `<InputGroup>` | `<Stack direction="row">` |
| `<FloatingLabel>` | `<FormControl variant="outlined">` + label prop |

### 1.3 Typography and Display

| Bootstrap | Tailwind Equivalent |
| --- | --- |
| `text-center` | `text-center` |
| `text-left` | `text-left` |
| `text-right` | `text-right` |
| `fw-bold` | `font-bold` |
| `fw-normal` | `font-normal` |
| `lead` | `text-lg` |
| `display-1` | `text-5xl font-bold` |
| `display-2` | `text-4xl font-bold` |
| `display-3` | `text-3xl font-bold` |
| `h1` | `text-2xl font-semibold` |
| `small` | `text-sm` |
| `text-muted` | `text-slate-500` |

---

## 2. Utility Class Conversion Guide

The agent should use this table during the mechanical replacement phase.

### 2.1 Spacing

| Bootstrap | Tailwind |
| --- | --- |
| `m-1` | `m-1` |
| `m-2` | `m-2` |
| `m-3` | `m-3` |
| `m-4` | `m-4` |
| `mx-auto` | `mx-auto` |
| `p-3` | `p-3` |
| `px-4` | `px-4` |
| `py-6` | `py-6` |
| `mt-5` | `mt-5` |
| `mb-4` | `mb-4` |
| `ms-2` | `ms-2` |
| `me-3` | `me-3` |

### 2.2 Flexbox

| Bootstrap | Tailwind |
| --- | --- |
| `d-flex` | `flex` |
| `flex-row` | `flex-row` |
| `flex-column` | `flex-col` |
| `justify-content-center` | `justify-center` |
| `justify-content-between` | `justify-between` |
| `align-items-center` | `items-center` |
| `align-self-start` | `self-start` |
| `flex-wrap` | `flex-wrap` |
| `gap-3` | `gap-3` |

### 2.3 Display and Sizing

| Bootstrap | Tailwind |
| --- | --- |
| `d-block` | `block` |
| `d-inline-block` | `inline-block` |
| `d-none` | `hidden` |
| `w-100` | `w-full` |
| `h-100` | `h-full` |
| `container` | `max-w-7xl mx-auto px-4` |

### 2.4 Responsive Helpers

| Bootstrap | Tailwind |
| --- | --- |
| `col-md-6` | `md:w-1/2` |
| `col-lg-4` | `lg:w-1/3` |
| `d-md-none` | `md:hidden` |
| `d-lg-block` | `lg:block` |
| `text-center text-md-start` | `text-center md:text-left` |

### 2.5 Color and Backgrounds

| Bootstrap | Tailwind |
| --- | --- |
| `text-primary` | `text-blue-600` or MUI theme color |
| `bg-primary` | `bg-indigo-600` |
| `bg-light` | `bg-slate-50` |
| `bg-dark` | `bg-slate-900` |
| `border` | `border border-slate-200` |

---

## 3. Refactoring Patterns

### 3.1 Inline Styles and Legacy Overrides

When a component contains Bootstrap overrides such as:

```tsx
<div style={{ marginTop: '20px', padding: '1rem' }} />
```

Refactor to one of the following patterns:

#### Option A: Tailwind utility classes

```tsx
<div className="mt-5 p-4" />
```

#### Option B: MUI `sx` prop

```tsx
<Box sx={{ mt: 2, p: 2 }} />
```

#### Option C: Hybrid approach

```tsx
<Box className="rounded-2xl shadow-soft" sx={{ p: 3 }} />
```

### 3.2 Converting Bootstrap Grid to Tailwind or MUI Grid2

#### Before

```tsx
<Row>
  <Col md={6}>Left</Col>
  <Col md={6}>Right</Col>
</Row>
```

#### After (Tailwind)

```tsx
<div className="flex flex-wrap">
  <div className="w-full md:w-1/2">Left</div>
  <div className="w-full md:w-1/2">Right</div>
</div>
```

#### After (MUI Grid2)

```tsx
<Grid2 container spacing={2}>
  <Grid2 size={{ xs: 12, md: 6 }}>Left</Grid2>
  <Grid2 size={{ xs: 12, md: 6 }}>Right</Grid2>
</Grid2>
```

### 3.3 Converting Bootstrap Buttons

#### Before

```tsx
<Button variant="primary" size="sm">Launch</Button>
```

#### After

```tsx
<Button variant="contained" color="primary" size="small">
  Launch
</Button>
```

### 3.4 Converting Bootstrap Modals

#### Before

```tsx
<Modal show={open} onHide={close}>...</Modal>
```

#### After

```tsx
<Dialog open={open} onClose={close}>...</Dialog>
```

### 3.5 Converting Bootstrap Cards

#### Before

```tsx
<Card className="shadow-sm">
  <Card.Body>...</Card.Body>
</Card>
```

#### After

```tsx
<Card className="shadow-soft">
  <CardContent>...</CardContent>
</Card>
```

### 3.6 Replacement Heuristics for the Agent

1. Replace import statements first.
2. Convert className strings from Bootstrap syntax to Tailwind syntax.
3. Replace component names from React-Bootstrap to MUI.
4. Rewrite inline styles into `sx` props or utility classes.
5. Keep semantic structure intact so behavior remains unchanged.
6. Do not introduce new abstractions unless the component is reused across the app.

---

## 4. Safe Migration Checklist

- No import from `react-bootstrap`, `bootstrap`, or `bootstrap/dist/css/bootstrap.min.css` remains.
- No use of Bootstrap utility classes remains in JSX or template markup.
- All interactive UI uses MUI primitives or native React.
- Tailwind utilities are used for layout and spacing only when MUI does not provide a cleaner abstraction.
- MUI theme values are centralized in one theme file.
