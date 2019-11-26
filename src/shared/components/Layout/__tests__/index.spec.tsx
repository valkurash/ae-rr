import { mount, shallow } from 'enzyme';
import React from 'react';

import { getRouteComponentPropsMock } from 'utils/test';

import { IProps, LayoutComponent } from '../';

const setup = (props: Partial<IProps> = {}) => {
    const authLogout = jest.fn();
    const setActivityStatus = jest.fn();

    const layoutProps: IProps = {
        // @ts-ignore
        authLogout,
        // @ts-ignore
        setActivityStatus,
        userStatusInactive: false,
        ...getRouteComponentPropsMock(),
    };

    const mergeProps = { ...layoutProps, ...props };
    const getWrapperShallow = () => shallow<IProps>(<LayoutComponent {...mergeProps} />);
    const getWrapperMount = () => mount<IProps>(<LayoutComponent {...mergeProps} />);
    return {
        getWrapperShallow,
        getWrapperMount,
        authLogout,
        setActivityStatus,
    };
};

describe('<Layout />', () => {
    it('should be rendered properly ', () => {
        const wrapper = setup().getWrapperShallow();
        expect(wrapper.find('[dataTestId="layout"]').exists());
        expect(wrapper.find('[dataTestId="layout-aside"]').exists());
    });

    it('should render inactive panel', () => {
        const wrapper = setup().getWrapperShallow();
        expect(wrapper.find('[dataTestId="inactive-notification"]').exists());
        expect(wrapper.find('[dataTestId="layout--inactive"]').exists());
    });

    it('should call logout handler on click', () => {
        const { authLogout, getWrapperShallow } = setup();
        const wrapper = getWrapperShallow();
        wrapper.find('.logout-btn').simulate('click');
        expect(authLogout).toHaveBeenCalled();
    });
});
