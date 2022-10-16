export type TariffType = 'first' | 'second' | null;

export class PaymentsDto {
  tariff: TariffType;
}
