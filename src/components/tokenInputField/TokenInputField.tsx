import { useState } from 'react';
import { classNameGenerator, sanitizeNumberInput } from 'utils/pureFunctions';
import { Modal } from 'components/modal/Modal';
import { SearchableTokenList } from 'components/searchableTokenList/SearchableTokenList';
import { ViewToken } from 'redux/bancorAPI/bancorAPI';
import { TokenListItem } from 'observables/tokenList';
import { ReactComponent as IconChevronDown } from 'assets/icons/chevronDown.svg';
import 'components/tokenInputField/TokenInputField.css';
import 'components/inputField/InputField.css';

interface TokenInputFieldProps {
  label: string;
  balance: number;
  balanceUsd: number;
  border?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  input: string;
  setInput?: Function;
  onChange?: Function;
  token: TokenListItem;
  setToken: Function;
  debounce?: Function;
}

export const TokenInputField = ({
  label,
  balance,
  balanceUsd,
  border,
  selectable,
  token,
  setToken,
  input,
  setInput,
  onChange,
  disabled,
  debounce,
}: TokenInputFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (text: string) => {
    if (setInput) setInput(text);
    if (debounce) debounce(text);
  };

  const placeholder = 'Enter token amount';
  const inputFieldStyles = `token-input-field ${classNameGenerator({
    'input-field-border': border,
  })}`;

  return (
    <div>
      <div className="flex justify-between pr-10">
        <span className="font-medium">{label}</span>
        <button
          onClick={() => handleChange(balance.toString())}
          className="text-12 cursor-pointer focus:outline-none"
        >
          Balance: {balance}
          <span className="text-primary ml-4">(~${balanceUsd})</span>
        </button>
      </div>

      <div className="flex items-center">
        <div
          className={`flex items-center mr-24 ${classNameGenerator({
            'cursor-pointer': selectable,
          })}`}
          onClick={() => setIsOpen(true)}
        >
          <img
            src={token?.logoURI}
            alt="Token"
            className="bg-grey-2 rounded-full h-24 w-24"
          />
          <span className="text-20 mx-10">{token?.symbol}</span>
          {selectable && (
            <div>
              <IconChevronDown className="w-[10px] h-[6px] mr-10 text-grey-4 dark:text-grey-3" />
            </div>
          )}
        </div>

        <div className="relative w-full">
          <div className="absolute text-12 bottom-0 right-0 mr-[22px] mb-10">
            ~$123.56
          </div>
          <input
            type="text"
            value={input}
            disabled={disabled}
            placeholder={placeholder}
            className={inputFieldStyles}
            onChange={(event) => {
              const val = sanitizeNumberInput(event.target.value);
              onChange ? onChange(val) : handleChange(val);
            }}
          />
        </div>
      </div>
      <Modal title="Select a Token" isOpen={isOpen} setIsOpen={setIsOpen}>
        <SearchableTokenList
          onClick={(token: ViewToken) => {
            setToken(token);
            setIsOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};
