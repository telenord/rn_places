import isAndroid from './isAndroid';

const iconName = name => `${isAndroid?'md': 'ios'}-${name}`;

export default iconName;