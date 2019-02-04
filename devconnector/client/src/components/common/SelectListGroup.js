import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            { option.label }
        </option>
    ));
    return(
        <div>
            <div className="form-group">
                        <select
                            /**those gonna come from our backend API*/
                            className={classnames('form-control form-control-lg', {
                                'is-invalid':error
                            })}
                            name={name}
                            value={value}
                            onChange={onChange}
                        >
                            { selectOptions }
                        </select>
                        {info && <small className="form-text text-muted">{info}</small>}
                        {/**those gonna come from our backend API*/}
                            {error && (
                                <div className="invalid-feedback">{error}</div>
                            )}
            </div>
        </div>
    )
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
  };

export default SelectListGroup;