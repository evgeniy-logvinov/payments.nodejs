import { TariffType } from './payments.dto';

export class PaymentsInfoDto {
  tariff: TariffType;
  cardNumber: number | null;
  cardHolders: string | null;
  until: {
    mm: number | null;
    yy: number | null;
  };
  cvv: number | null;
}
