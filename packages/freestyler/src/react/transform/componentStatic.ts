import {cloneElement} from 'react';
import {TCssTemplate} from 'freestyler-renderer/src/types';
import renderer from '../../renderer';

const transformComponentStatic = (Comp, staticTemplate: TCssTemplate) => {
    const {prototype} = Comp;
    const render_ = prototype.render;

    prototype.render = function() {
        const ast = render_.apply(this, arguments);
        const {props} = ast;
        const className =
            (props.className ? props.className : '') + renderer.renderStatic(Comp, staticTemplate, [this]);

        if (process.env.NODE_ENV === 'production') {
            props.className = className;
            return ast;
        } else {
            return cloneElement(ast, {...props, className}, props.children);
        }
    };
};

export default transformComponentStatic;