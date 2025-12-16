module.exports = function (RED) {
	'use strict';

	const { Lib } = require('iec104-protocol');

	function patchMissingDoublePoint(Lib) {
		class DoublePointInformation extends Lib.prototype.InformationObject {
			GetEncodedSize() {
				return 1;
			}
			get Type() {
				return Lib.prototype.TypeID.M_DP_NA_1;
			}
			get SupportsSequence() {
				return true;
			}
			value;
			quality;
			get Value() {
				return this.value;
			}
			set Value(val) {
				this.value = val;
			}
			get Quality() {
				return this.quality;
			}
			constructor(p1, p2, p3, p4) {
				super(p1, p2, p3, p4);
				if (typeof p4 != 'undefined') {
					let s = p3 + (p4 ? 0 : p1.SizeOfIOA);
					if (p2.length - s < 1) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for DoublePointInformation'
						);
					}
					const diq = p2[s++];
					this.value = diq & 0x03;
					this.quality = new Lib.prototype.QualityDescriptor(
						Lib.prototype.GetByteValue(diq & 0xf0)
					);
				} else {
					this.value = p2;
					this.quality = p3;
				}
			}
		}
		class DoublePointWithCP24Time2a extends DoublePointInformation {
			GetEncodedSize() {
				return 4;
			}
			get Type() {
				return Lib.prototype.TypeID.M_DP_TA_1;
			}
			get SupportsSequence() {
				return false;
			}
			timestamp;
			get Timestamp() {
				return this.timestamp;
			}
			constructor(p1, p2, p3, p4) {
				super(p1, p2, p3, p4);
				if (typeof p1 != 'number') {
					let s = p3 + p1.SizeOfIOA;
					if (p2.length - s < 4) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for DoublePointWithCP24Time2a'
						);
					}
					this.timestamp = new Lib.prototype.CP24Time2a(p2, s + 1);
				} else {
					this.timestamp = p4;
				}
			}
		}
		class DoublePointWithCP56Time2a extends DoublePointInformation {
			GetEncodedSize() {
				return 8;
			}
			get Type() {
				return Lib.prototype.TypeID.M_DP_TB_1;
			}
			get SupportsSequence() {
				return false;
			}
			timestamp;
			get Timestamp() {
				return this.timestamp;
			}
			constructor(p1, p2, p3, p4) {
				super(p1, p2, p3, p4);
				if (typeof p1 != 'number') {
					let s = p3 + p1.SizeOfIOA;
					if (p2.length - s < 8) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for DoublePointWithCP56Time2a'
						);
					}
					this.timestamp = new Lib.prototype.CP56Time2a(p2, s + 1);
				} else {
					this.timestamp = p4;
				}
			}
		}
		Lib.prototype.DoublePointInformation = DoublePointInformation;
		Lib.prototype.DoublePointWithCP24Time2a = DoublePointWithCP24Time2a;
		Lib.prototype.DoublePointWithCP56Time2a = DoublePointWithCP56Time2a;
	}

	function patchMissingBitstring(Lib) {
		class Bitstring32 extends Lib.prototype.InformationObject {
			GetEncodedSize() {
				return 5;
			}
			get Type() {
				return Lib.prototype.TypeID.M_BO_NA_1;
			}
			get SupportsSequence() {
				return true;
			}
			value;
			quality;
			get Value() {
				return this.value;
			}
			get Quality() {
				return this.quality;
			}
			constructor(p1, p2, p3, p4) {
				super(p1, p2, p3, p4);
				if (typeof p4 != 'undefined') {
					let s = p3 + (p4 ? 0 : p1.SizeOfIOA);
					if (p2.length - s < 5) {
						throw new Lib.prototype.ASDUParsingException('Message too small for Bitstring32');
					}
					this.value = p2.slice(s, s + 4);
					s += 4;
					this.quality = new Lib.prototype.QualityDescriptor(p2[s++]);
				} else {
					this.value = p2;
					this.quality = p3;
				}
			}
		}
		class Bitstring32WithCP24Time2a extends Bitstring32 {
			GetEncodedSize() {
				return 8;
			}
			get Type() {
				return Lib.prototype.TypeID.M_BO_TA_1;
			}
			get SupportsSequence() {
				return false;
			}
			timestamp;
			get Timestamp() {
				return this.timestamp;
			}
			constructor(p1, p2, p3, p4) {
				super(p1, p2, p3, p4);
				if (typeof p1 != 'number') {
					let s = p3 + p1.SizeOfIOA;
					if (p2.length - s < 8) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for Bitstring32WithCP24Time2a'
						);
					}
					this.timestamp = new Lib.prototype.CP24Time2a(p2, s + 5);
				} else {
					this.timestamp = p4;
				}
			}
		}
		class Bitstring32WithCP56Time2a extends Bitstring32 {
			GetEncodedSize() {
				return 12;
			}
			get Type() {
				return Lib.prototype.TypeID.M_BO_TB_1;
			}
			get SupportsSequence() {
				return false;
			}
			timestamp;
			get Timestamp() {
				return this.timestamp;
			}
			constructor(p1, p2, p3, p4) {
				super(p1, p2, p3, p4);
				if (typeof p1 != 'number') {
					let s = p3 + p1.SizeOfIOA;
					if (p2.length - s < 12) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for Bitstring32WithCP56Time2a'
						);
					}
					this.timestamp = new Lib.prototype.CP56Time2a(p2, s + 5);
				} else {
					this.timestamp = p4;
				}
			}
		}
		Lib.prototype.Bitstring32 = Bitstring32;
		Lib.prototype.Bitstring32WithCP24Time2a = Bitstring32WithCP24Time2a;
		Lib.prototype.Bitstring32WithCP56Time2a = Bitstring32WithCP56Time2a;
	}

	function patchMissingStepPosition(Lib) {
		class StepPositionInformation extends Lib.prototype.InformationObject {
			GetEncodedSize() {
				return 2;
			}
			get Type() {
				return Lib.prototype.TypeID.M_ST_NA_1;
			}
			get SupportsSequence() {
				return true;
			}
			value;
			transient;
			quality;
			get Value() {
				return this.value;
			}
			get Transient() {
				return this.transient;
			}
			get Quality() {
				return this.quality;
			}
			constructor(p1, p2, p3, p4) {
				super(p1, p2, p3, p4);
				if (typeof p4 != 'undefined') {
					let s = p3 + (p4 ? 0 : p1.SizeOfIOA);
					if (p2.length - s < 2) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for StepPositionInformation'
						);
					}
					const vti = p2[s++];
					this.value = vti & 0x7f;
					if (this.value > 63) {
						this.value = this.value - 128;
					}
					this.transient = (vti & 0x80) !== 0;
					this.quality = new Lib.prototype.QualityDescriptor(p2[s++]);
				} else {
					this.value = p2;
					this.transient = p3;
					this.quality = p4;
				}
			}
		}
		class StepPositionWithCP24Time2a extends StepPositionInformation {
			GetEncodedSize() {
				return 5;
			}
			get Type() {
				return Lib.prototype.TypeID.M_ST_TA_1;
			}
			get SupportsSequence() {
				return false;
			}
			timestamp;
			get Timestamp() {
				return this.timestamp;
			}
			constructor(p1, p2, p3, p4, p5) {
				super(p1, p2, p3, p4);
				if (typeof p1 != 'number') {
					let s = p3 + p1.SizeOfIOA;
					if (p2.length - s < 5) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for StepPositionWithCP24Time2a'
						);
					}
					this.timestamp = new Lib.prototype.CP24Time2a(p2, s + 2);
				} else {
					this.timestamp = p5;
				}
			}
		}
		class StepPositionWithCP56Time2a extends StepPositionInformation {
			GetEncodedSize() {
				return 9;
			}
			get Type() {
				return Lib.prototype.TypeID.M_ST_TB_1;
			}
			get SupportsSequence() {
				return false;
			}
			timestamp;
			get Timestamp() {
				return this.timestamp;
			}
			constructor(p1, p2, p3, p4, p5) {
				super(p1, p2, p3, p4);
				if (typeof p1 != 'number') {
					let s = p3 + p1.SizeOfIOA;
					if (p2.length - s < 9) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for StepPositionWithCP56Time2a'
						);
					}
					this.timestamp = new Lib.prototype.CP56Time2a(p2, s + 2);
				} else {
					this.timestamp = p5;
				}
			}
		}
		Lib.prototype.StepPositionInformation = StepPositionInformation;
		Lib.prototype.StepPositionWithCP24Time2a = StepPositionWithCP24Time2a;
		Lib.prototype.StepPositionWithCP56Time2a = StepPositionWithCP56Time2a;
	}

	function patchMissingIntegratedTotals(Lib) {
		class IntegratedTotals extends Lib.prototype.InformationObject {
			GetEncodedSize() {
				return 5;
			}
			get Type() {
				return Lib.prototype.TypeID.M_IT_NA_1;
			}
			get SupportsSequence() {
				return true;
			}
			value;
			quality;
			get Value() {
				return this.value;
			}
			get Quality() {
				return this.quality;
			}
			constructor(p1, p2, p3, p4) {
				super(p1, p2, p3, p4);
				if (typeof p4 != 'undefined') {
					let s = p3 + (p4 ? 0 : p1.SizeOfIOA);
					if (p2.length - s < 5) {
						throw new Lib.prototype.ASDUParsingException('Message too small for IntegratedTotals');
					}
					const dataView = new DataView(p2.buffer, p2.byteOffset + s, 4);
					this.value = dataView.getInt32(0, true);
					s += 4;
					this.quality = p2[s++];
				} else {
					this.value = p2;
					this.quality = p3;
				}
			}
		}
		class IntegratedTotalsWithCP24Time2a extends IntegratedTotals {
			GetEncodedSize() {
				return 8;
			}
			get Type() {
				return Lib.prototype.TypeID.M_IT_TA_1;
			}
			get SupportsSequence() {
				return false;
			}
			timestamp;
			get Timestamp() {
				return this.timestamp;
			}
			constructor(p1, p2, p3, p4, p5) {
				super(p1, p2, p3, p4);
				if (typeof p1 != 'number') {
					let s = p3 + p1.SizeOfIOA;
					if (p2.length - s < 8) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for IntegratedTotalsWithCP24Time2a'
						);
					}
					this.timestamp = new Lib.prototype.CP24Time2a(p2, s + 5);
				} else {
					this.timestamp = p5;
				}
			}
		}
		class IntegratedTotalsWithCP56Time2a extends IntegratedTotals {
			GetEncodedSize() {
				return 12;
			}
			get Type() {
				return Lib.prototype.TypeID.M_IT_TB_1;
			}
			get SupportsSequence() {
				return false;
			}
			timestamp;
			get Timestamp() {
				return this.timestamp;
			}
			constructor(p1, p2, p3, p4, p5) {
				super(p1, p2, p3, p4);
				if (typeof p1 != 'number') {
					let s = p3 + p1.SizeOfIOA;
					if (p2.length - s < 12) {
						throw new Lib.prototype.ASDUParsingException(
							'Message too small for IntegratedTotalsWithCP56Time2a'
						);
					}
					this.timestamp = new Lib.prototype.CP56Time2a(p2, s + 5);
				} else {
					this.timestamp = p5;
				}
			}
		}
		Lib.prototype.IntegratedTotals = IntegratedTotals;
		Lib.prototype.IntegratedTotalsWithCP24Time2a = IntegratedTotalsWithCP24Time2a;
		Lib.prototype.IntegratedTotalsWithCP56Time2a = IntegratedTotalsWithCP56Time2a;
	}

	function patchMissingParameterValues(Lib) {
		class ParameterNormalizedValue extends Lib.prototype.InformationObject {
			GetEncodedSize() {
				return 3;
			}
			get Type() {
				return Lib.prototype.TypeID.P_ME_NA_1;
			}
			get SupportsSequence() {
				return false;
			}
			scaledValue;
			quality;
			get Value() {
				return this.scaledValue;
			}
			get NormalizedValue() {
				return parseFloat(this.scaledValue.Value + 0.5) / parseFloat(32767.5);
			}
			get Quality() {
				return this.quality;
			}
			constructor(p1, p2, p3) {
				super(p1, p2, p3, false);
				let s = p3 + p1.SizeOfIOA;
				if (p2.length - s < 3) {
					throw new Lib.prototype.ASDUParsingException(
						'Message too small for ParameterNormalizedValue'
					);
				}
				this.scaledValue = new Lib.prototype.ScaledValue(p2, s);
				s += 2;
				this.quality = p2[s++];
			}
		}
		class ParameterScaledValue extends Lib.prototype.InformationObject {
			GetEncodedSize() {
				return 3;
			}
			get Type() {
				return Lib.prototype.TypeID.P_ME_NB_1;
			}
			get SupportsSequence() {
				return false;
			}
			scaledValue;
			quality;
			get Value() {
				return this.scaledValue;
			}
			get ScaledValue() {
				return this.scaledValue.Value;
			}
			get Quality() {
				return this.quality;
			}
			constructor(p1, p2, p3) {
				super(p1, p2, p3, false);
				let s = p3 + p1.SizeOfIOA;
				if (p2.length - s < 3) {
					throw new Lib.prototype.ASDUParsingException(
						'Message too small for ParameterScaledValue'
					);
				}
				this.scaledValue = new Lib.prototype.ScaledValue(p2, s);
				s += 2;
				this.quality = p2[s++];
			}
		}
		class ParameterFloatValue extends Lib.prototype.InformationObject {
			GetEncodedSize() {
				return 5;
			}
			get Type() {
				return Lib.prototype.TypeID.P_ME_NC_1;
			}
			get SupportsSequence() {
				return false;
			}
			value;
			quality;
			get Value() {
				return this.value;
			}
			get Quality() {
				return this.quality;
			}
			constructor(p1, p2, p3) {
				super(p1, p2, p3, false);
				let s = p3 + p1.SizeOfIOA;
				if (p2.length - s < 5) {
					throw new Lib.prototype.ASDUParsingException('Message too small for ParameterFloatValue');
				}
				this.value = Lib.prototype.ToSingle(p2, s);
				s += 4;
				this.quality = p2[s++];
			}
		}
		Lib.prototype.ParameterNormalizedValue = ParameterNormalizedValue;
		Lib.prototype.ParameterScaledValue = ParameterScaledValue;
		Lib.prototype.ParameterFloatValue = ParameterFloatValue;
	}

	function sendCorrectSFrame(connection, node) {
		if (
			!connection ||
			!connection.socket ||
			typeof connection.receiveSequenceNumber === 'undefined'
		) {
			node.warn("Не можу надіслати S-Frame: з'єднання або лічильник не ініціалізовано.");
			return;
		}
		const msg = new Uint8Array(6);
		msg[0] = 0x68;
		msg[1] = 0x04;
		msg[2] = 0x01;
		msg[3] = 0x00;
		msg[4] = Lib.prototype.GetByteValue((connection.receiveSequenceNumber % 128) * 2);
		msg[5] = Lib.prototype.GetByteValue(connection.receiveSequenceNumber / 128);

		connection.socket.write(msg);
	}

	const DP_STATES = { 0: 'INDETERMINATE (0)', 1: 'OFF (1)', 2: 'ON (2)', 3: 'INDETERMINATE (3)' };

	function formatBitstring(value) {
		if (!value || value.length < 4) return 'INVALID_BITSTRING';
		return (
			'0x' +
			Array.from(value)
				.map((byte) => byte.toString(16).padStart(2, '0'))
				.join('')
				.toUpperCase()
		);
	}

	function formatBCR(bcr) {
		if (typeof bcr !== 'number') return 'N/A (Invalid BCR)';
		const parts = [];
		parts.push(`SQ=${bcr & 0x0f}`);
		if (bcr & 0x10) parts.push('CY');
		if (bcr & 0x20) parts.push('OV');
		if (bcr & 0x80) parts.push('IV');
		return `[BCR: ${parts.join(', ')} (raw: ${bcr})]`;
	}

	function formatQPM(qpm) {
		if (typeof qpm !== 'number') return 'N/A (Invalid QPM)';
		return `[QPM: (raw: ${qpm})]`;
	}

	function IEC104ClientNode(config) {
		RED.nodes.createNode(this, config);
		const node = this;

		node.host = config.host;
		node.port = parseInt(config.port) || 2404;
		node.commonAddress = parseInt(config.commonAddress) || 1;
		node.allowSpontaneous = config.allowSpontaneous !== false;
		node.enableGeneralInterrogation = config.enableGeneralInterrogation !== false;
		const pollingInterval = parseInt(config.pollingInterval, 10);
		node.pollingInterval =
			Number.isFinite(pollingInterval) && pollingInterval > 0 ? pollingInterval : 0;
		node.connection = null;
		node.generalInterrogationTimer = null;

		if (!Lib.prototype.DoublePointInformation) patchMissingDoublePoint(Lib);
		if (!Lib.prototype.Bitstring32) patchMissingBitstring(Lib);
		if (!Lib.prototype.StepPositionInformation) patchMissingStepPosition(Lib);
		if (!Lib.prototype.IntegratedTotals) patchMissingIntegratedTotals(Lib);
		if (!Lib.prototype.ParameterNormalizedValue) patchMissingParameterValues(Lib);

		function clearGeneralInterrogationTimer() {
			if (node.generalInterrogationTimer) {
				clearInterval(node.generalInterrogationTimer);
				node.generalInterrogationTimer = null;
			}
		}

		function scheduleGeneralInterrogationTimer() {
			clearGeneralInterrogationTimer();
			if (!node.enableGeneralInterrogation) return;
			if (!node.pollingInterval) return;
			node.generalInterrogationTimer = setInterval(() => {
				if (!node.connection) return;
				sendGeneralInterrogation('scheduled');
			}, node.pollingInterval * 1000);
		}

		function sendGeneralInterrogation(reason) {
			if (!node.connection) {
				node.debug(
					`Пропущено загальне опитування (${reason || 'unspecified'}): немає активного з'єднання.`
				);
				return;
			}
			try {
				node.log(`Загальне опитування (${reason || 'manual'}) для CA ${node.commonAddress}`);
				node.connection.SendInterrogationCommand(
					Lib.prototype.CauseOfTransmission.ACTIVATION,
					node.commonAddress,
					20
				);
			} catch (err) {
				node.error(`Не вдалося виконати загальне опитування: ${err.message}`);
			}
		}

		function connectionHandler(callingConnection, event) {
			if (!node.connection || callingConnection !== node.connection) {
				return;
			}
			switch (event) {
				case Lib.prototype.ConnectionEvent.OPENED:
					node.status({ fill: 'blue', shape: 'dot', text: 'connected' });
					node.log(`TCP з'єднання встановлено з ${node.host}:${node.port}`);
					node.log('Відправка команди STARTDT...');
					node.connection.socket.write(node.connection.STARTDT_ACT_MSG);
					break;
				case Lib.prototype.ConnectionEvent.CLOSED:
					node.status({ fill: 'red', shape: 'ring', text: 'disconnected' });
					node.log(`З'єднання закрито.`);
					clearGeneralInterrogationTimer();
					break;
				case Lib.prototype.ConnectionEvent.STARTDT_CON_RECEIVED:
					node.status({ fill: 'green', shape: 'dot', text: 'data active' });
					node.log('Отримано STARTDT_CON. Передача даних дозволена.');
					if (node.enableGeneralInterrogation) {
						sendGeneralInterrogation('initial');
						scheduleGeneralInterrogationTimer();
					} else {
						node.debug('Загальне опитування відключено в налаштуваннях.');
					}
					break;
				case Lib.prototype.ConnectionEvent.STOPDT_CON_RECEIVED:
					node.status({ fill: 'yellow', shape: 'ring', text: 'stopped' });
					node.log('Отримано STOPDT_CON. Передача даних зупинена.');
					break;
			}
		}

		function asduReceivedHandler(parameter, asdu) {
			const isSpontaneous = asdu.Cot === Lib.prototype.CauseOfTransmission.SPONTANEOUS;
			if (!node.allowSpontaneous && isSpontaneous) {
				node.debug(
					`Спонтанний ASDU (COT=${asdu.Cot}, CA=${
						asdu.ca ?? asdu.Ca ?? 'N/A'
					}) проігноровано через налаштування.`
				);
				if (asdu.Cot !== Lib.prototype.CauseOfTransmission.ACTIVATION_CON) {
					sendCorrectSFrame(node.connection, node);
				}
				return;
			}
			const outputMsg = {
				typeId: asdu.TypeId,
				cot: asdu.Cot,
				ca: asdu.ca ?? asdu.Ca ?? null,
				isTest: asdu.IsTest,
				isNegative: asdu.isNegative ?? asdu.IsNegative ?? null,
				objects: [],
			};

			for (let i = 0; i < asdu.NumberOfElements; i++) {
				try {
					const element = asdu.GetElement(i);
					let valueStr = null;
					let qualityStr = null;
					const typeId = asdu.TypeId;

					if (typeId === 3 || typeId === 4 || typeId === 31) {
						valueStr = DP_STATES[element.Value] || `UNKNOWN_STATE (${element.Value})`;
						qualityStr = element.Quality?.ToString() || 'N/A';
					} else if (typeId === 7 || typeId === 8 || typeId === 33) {
						valueStr = formatBitstring(element.Value);
						qualityStr = element.Quality?.ToString() || 'N/A';
					} else if (typeId === 5 || typeId === 6 || typeId === 32) {
						valueStr = `Value: ${element.Value}, Transient: ${element.Transient}`;
						qualityStr = element.Quality?.ToString() || 'N/A';
					} else if (typeId === 15 || typeId === 16 || typeId === 37) {
						valueStr = element.Value;
						qualityStr = formatBCR(element.Quality);
					} else if (typeId === 110 || typeId === 111 || typeId === 112) {
						if (typeId === 110) valueStr = element.NormalizedValue;
						else if (typeId === 111) valueStr = element.ScaledValue;
						else valueStr = element.Value;
						qualityStr = formatQPM(element.Quality);
					} else {
						if (element.Value !== undefined) valueStr = element.Value;
						else if (element.NormalizedValue !== undefined) valueStr = element.NormalizedValue;
						else if (element.ScaledValue !== undefined) valueStr = element.ScaledValue;
						else if (element.ShortValue !== undefined) valueStr = element.ShortValue;
						else valueStr = 'N/A';

						qualityStr = element.Quality?.ToString() || 'N/A';
					}

					outputMsg.objects.push({
						ioa: element.ObjectAddress,
						value: valueStr,
						quality: qualityStr,
						timestamp: element.Timestamp ? element.Timestamp.ToString() : null,
					});
				} catch (e) {
					node.error(`Помилка розбору елемента: ${e.message}`, { asdu: asdu });
				}
			}

			node.send({ payload: outputMsg });

			if (asdu.Cot !== Lib.prototype.CauseOfTransmission.ACTIVATION_CON) {
				sendCorrectSFrame(node.connection, node);
			}
		}

		function startConnection() {
			node.log(`Спроба підключення до ${node.host}:${node.port}...`);
			node.status({ fill: 'grey', shape: 'dot', text: 'connecting...' });

			try {
				node.connection = new Lib.prototype.Connection(node.host, node.port);

				node.connection.receiveSequenceNumber = 0;

				node.connection.SetConnectionHandler(connectionHandler, node.connection);
				node.connection.SetASDUReceivedHandler(asduReceivedHandler, null);

				node.connection.SetKeepAlive(false);

				node.connection.SetReconnect(true);

				node.connection.Connect();
			} catch (e) {
				node.error(`Помилка при ініціалізації з'єднання: ${e.message}`);
				node.status({ fill: 'red', shape: 'ring', text: 'connection error' });
			}
		}

		startConnection();

		node.on('close', function (done) {
			node.log("Закриття з'єднання IEC 104...");
			clearGeneralInterrogationTimer();
			if (node.connection && node.connection.socket) {
				node.connection.SetReconnect(false);
				if (node.connection.socket) {
					node.connection.socket.removeAllListeners();
					node.connection.socket.destroy();
				}
				node.connection = null;
			}
			node.status({ fill: 'red', shape: 'ring', text: 'closed' });
			done();
		});
	}

	RED.nodes.registerType('iec104-client', IEC104ClientNode);
};
