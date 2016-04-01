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
- effect [ 'fade' | 'scale' | 'slide']
- maskcolor
- delay

#### *methods*
-----
- open()
- close()
- toggle()
