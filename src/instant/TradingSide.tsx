import { BigNumber } from 'bignumber.js';
import * as React from 'react';
import { createNumberMask } from 'text-mask-addons/dist/textMaskAddons';

import { tokens } from '../blockchain/config';
import { User } from '../blockchain/user';
import { OfferType } from '../exchange/orderbook/orderbook';
import { BigNumberInput } from '../utils/bigNumberInput/BigNumberInput';
import { formatPrice } from '../utils/formatters/format';
import { Asset } from './asset/Asset';
import * as styles from './Instant.scss';
import { InstantFormChangeKind, ManualChange, ViewKind } from './instantForm';

interface TradingSideProps {
  placeholder: string;
  dataTestId: string;
  asset: string;
  side: OfferType;
  amount: BigNumber;
  balance: BigNumber;
  user: User;
  onAmountChange: () => void;
  change: (change: ManualChange) => void;
}

class TradingSide extends React.Component<TradingSideProps> {
  public render() {
    const { amount, asset, balance, placeholder, onAmountChange, user } = this.props;
    return (
      <div className={styles.tradingSide} data-test-id={this.props.dataTestId}>
        <Asset currency={asset} balance={balance} user={user} onClick={this.changeToken}/>
        {/* TODO: Make it parameterized like the tokens in offerMakeForm.*/}
        <BigNumberInput
          data-test-id={'amount'}
          type="text"
          className={styles.input}
          mask={createNumberMask({
            allowDecimal: true,
            decimalLimit: tokens[asset] ? tokens[asset].digits : 5,
            prefix: ''
          })}
          onChange={onAmountChange}
          value={
            (amount || null) &&
            formatPrice(amount, asset)
          }
          guide={true}
          placeholder={placeholder}
        />
      </div>
    );
  }

  private changeToken = () => {
    this.props.change({
      kind: InstantFormChangeKind.viewChange,
      view: this.props.side === OfferType.buy ? ViewKind.buyAssetSelector : ViewKind.sellAssetSelector,
    });
  }
}

export const Selling = (props: any) => (
  <TradingSide dataTestId="selling-token" side={OfferType.sell} placeholder="Deposit Amount" {...props}/>
);
export const Buying = (props: any) => (
  <TradingSide dataTestId="buying-token" side={OfferType.buy} placeholder="Receive Amount" {...props}/>
);
