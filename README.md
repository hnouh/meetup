Hello Guys I updated the frontend and backend,
for the error that the food menu doesn't update when I change the choice, because I forget put choice as a dependency in useEffect :sweat_smile:, because we should call the useEffect every time user change their choice.
so the code will be like this,
```
useEffect(()=>{
        //the code
    },[choice])
```

and in the backend, we should link all the routers with our app and here we only have the groceryRouter, so after define the cors:
the code will be like this,
```
const groceryRouter = require('./routes/grocery');
app.use(groceryRouter);
```

hope it's clear now and if you have any question just send an email to me at any time.