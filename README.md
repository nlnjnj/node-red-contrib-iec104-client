# node-red-contrib-iec104-client

A Node-RED node that provides IEC 60870-5-104 (IEC 104) client functionality for SCADA systems. This node acts as a master/client and connects to IEC 104 servers (RTUs, substations, etc.).

## Features

- **Full IEC 104 Protocol Support** - Connects to IEC 104 servers with complete protocol implementation
- **Extended Type Support** - Includes patches for commonly used but missing types:
  - Double Point Information (M_DP_NA_1, M_DP_TA_1, M_DP_TB_1)
  - Bitstring32 (M_BO_NA_1, M_BO_TA_1, M_BO_TB_1)
  - Step Position Information (M_ST_NA_1, M_ST_TA_1, M_ST_TB_1)
  - Integrated Totals (M_IT_NA_1, M_IT_TA_1, M_IT_TB_1)
  - Parameter Values (P_ME_NA_1, P_ME_NB_1, P_ME_NC_1)
- **General Interrogation** - Automatic periodic polling with configurable intervals
- **Spontaneous Data** - Option to enable/disable spontaneous messages
- **Auto Reconnection** - Automatic reconnection on connection loss
- **Proper S-Frame Handling** - Correct acknowledgment of received I-Frames

## Installation

```bash
npm install node-red-contrib-iec104-client
```

Or install directly from the Node-RED palette manager.

## Configuration

### Node Properties

- **Host** - IP address or hostname of the IEC 104 server
- **Port** - TCP port (default: 2404)
- **Common Address** - Common Address of ASDU (default: 1)
- **Enable General Interrogation** - Enable automatic general interrogation
- **Polling Interval** - Interval in seconds for general interrogation (0 to disable periodic polling)
- **Allow Spontaneous** - Enable processing of spontaneous messages from the server

## Usage

1. Drag the `iec104-client` node from the palette into your flow
2. Double-click to configure the connection parameters
3. Connect the output to process received data
4. Deploy the flow

### Output Format

The node outputs messages in the following format:

```javascript
{
  payload: {
    typeId: 1,              // ASDU Type ID
    cot: 3,                 // Cause of Transmission
    ca: 1,                  // Common Address
    isTest: false,          // Test flag
    isNegative: false,      // Negative flag
    objects: [
      {
        ioa: 100,           // Information Object Address
        value: 1,           // Value (formatted based on type)
        quality: "GOOD",    // Quality descriptor
        timestamp: "..."    // Timestamp (if available)
      }
    ]
  }
}
```

## Type ID Support

The node supports all standard IEC 104 types including:

| Type ID | Description                                      |
| ------- | ------------------------------------------------ |
| 1       | Single-point information (M_SP_NA_1)             |
| 3       | Double-point information (M_DP_NA_1)             |
| 5       | Step position information (M_ST_NA_1)            |
| 7       | Bitstring of 32 bits (M_BO_NA_1)                 |
| 9       | Measured value, normalized (M_ME_NA_1)           |
| 11      | Measured value, scaled (M_ME_NB_1)               |
| 13      | Measured value, short floating point (M_ME_NC_1) |
| 15      | Integrated totals (M_IT_NA_1)                    |
| 30-36   | With CP56Time2a timestamps                       |
| 110-112 | Parameter values                                 |

## Status Indicators

- **Grey dot** - Connecting...
- **Blue dot** - TCP connected
- **Green dot** - Data transfer active
- **Yellow ring** - Data transfer stopped
- **Red ring** - Disconnected

## Example Flow

```json
[
	{
		"id": "iec104-client-1",
		"type": "iec104-client",
		"host": "192.168.1.100",
		"port": "2404",
		"commonAddress": "1",
		"enableGeneralInterrogation": true,
		"pollingInterval": "60",
		"allowSpontaneous": true
	}
]
```

## Dependencies

- [iec104-protocol](https://www.npmjs.com/package/iec104-protocol) - IEC 60870-5-104 protocol implementation

## License

Apache-2.0

## Author

Max Lyubchenko

## Contributing

Issues and pull requests are welcome!

## Changelog

### 1.0.0

- Initial release
- Support for extended IEC 104 types
- General interrogation with configurable polling
- Spontaneous data handling
- Auto-reconnection support
