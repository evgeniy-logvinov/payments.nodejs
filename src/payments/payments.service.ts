import {
  ForbiddenException,
  Injectable,
  // NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { getDatabase } from 'firebase-admin/database';
import { UidIdentifier } from 'firebase-admin/lib/auth/identifier';
import { PaymentsInfoDto } from './dto/payments-info.dto';

@Injectable()
export class PaymentsService {
  // History for payments
  async getPaymentsByUid(uid: UidIdentifier): Promise<{ tariff: string }> {
    try {
      const db = getDatabase();
      const ref = db.ref(`payments/${uid}/tariff`);
      const snapshot = await ref.once('value');
      const value = snapshot.val();
      console.log('val', value);
      return value;
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Problems with save info');
    }
  }

  async getPaymentsInfoByUid(uid: UidIdentifier): Promise<PaymentsInfoDto> {
    try {
      const db = getDatabase();
      const ref = db.ref(`payments/${uid}/info`);
      const snapshot = await ref.once('value');
      const value = snapshot.val();
      console.log('val', value);
      return value;
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Problems with save info');
    }
  }

  async setPaymentInfoByUid(
    uid: UidIdentifier,
    paymentsInfoDto: PaymentsInfoDto,
  ): Promise<{ message: string }> {
    const db = getDatabase();
    const paymentsInfo = await db.ref(`payments/${uid}/info`);
    await paymentsInfo.push().set(paymentsInfoDto);
    const paymentsRef = db.ref(`payments/${uid}/tariff`);
    await paymentsRef.set({
      tariff: paymentsInfoDto.tariff,
    });

    return { message: 'done' };
  }
}
