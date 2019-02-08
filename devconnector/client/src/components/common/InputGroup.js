import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    /**'type' is required because this component is input */
    type,
    onChange,
}) => {
    return(
        <div>
            <div className="input-grou mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className={icon} />
                    </span>
                </div>
                        <input
                            /**those gonna come from our backend API*/
                            className={classnames('form-control form-control-lg', {
                                'is-invalid':error
                            })}
                            placeholder={placeholder}
                            name={name}
                            value={value}
                            onChange={onChange}
                        />
                        {/**those gonna come from our backend API*/}
                            {error && (
                                <div className="invalid-feedback">{error}</div>
                            )}
            </div>
        </div>
    )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;