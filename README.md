#modal-layer
- - -
###Install
`npm install modal-layer --save`

###Usage for webpack
```javascript
import ModalLayer from 'modal-layer';
require('modal-layer/dist/style.css');

const modal = new ModalLayer(selector [,options]);
```

#### *selector*
-----
#### *options*
-----
- effect ( *value: 'fade' | 'scale' | 'slide'* )
- maskcolor ( *type: color* )
- delay ( *type: number* )
- openStartFun ( *type: function* )
- openEndFun ( *type: function* )
- closeStartFun ( *type: function* )
- closeEndFun ( *type: function* )

#### *methods*
-----
- open()
- close()
- toggle()
