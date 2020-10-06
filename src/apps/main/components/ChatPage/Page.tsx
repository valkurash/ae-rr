import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
//import io from 'socket.io-client';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import { Loading } from 'components/Loading';
import { isLoading, isSuccess } from 'utils/redux';
import { ErrorBoundary } from 'components/ErrorBoundary';

import { useUserContext } from '../WithGeneralInfo/UserContext';

//const socket = io('http://localhost:8091');
const socket = new W3CWebSocket('ws://127.0.0.1:8091');
/** Component props depend on dispatch (from connect). */
interface IDispatchProps {}

/** Component props from Application Redux state (connect). */
interface IStateProps {}

/** Component props. */
export interface IProps extends IDispatchProps, IStateProps, RouteComponentProps {}

/** Main page. */
export const ChatPageComponent: React.FunctionComponent<IProps> = (props: IProps) => {
    const infoBranch = useUserContext();
    const { data: info = { name: 'default', chats: [] } } = infoBranch;
    const isInfoLoading = isLoading(infoBranch);
    const { id } = useParams();

    const [chatLog, setChatLog] = useState<string[]>([]);
    const [lastMsg, setLastMsg] = useState<{ last: string }>({ last: '' });
    const [isConnected, setIsConnected] = useState(false);
    const [inputMsg, setInputMsg] = useState('');

    // /** Fetch info. */
    // useEffect(() => {
    //     if (isSuccess(infoBranch)) {
    //         socket.emit('add user', id, info.name);
    //
    //         socket.on('login', (data: any) => {
    //             setLastMsg(`You are joined! Users number: ${data.numUsers}`);
    //         });
    //         // socket.on('disconnect', () => {
    //         //     log('you have been disconnected');
    //         // });
    //         socket.on('user joined', (data: any) => {
    //             setLastMsg(`${data.username} joined. Users number: ${data.numUsers}`);
    //         });
    //         socket.on('user left', (data: any) => {
    //             setLastMsg(`${data.username} left. Users number: ${data.numUsers} `);
    //         });
    //         socket.on('new message', (data: any) => {
    //             setLastMsg(data.message);
    //         });
    //     }
    // }, [infoBranch]);
    //
    // useEffect(() => {
    //     setChatLog([...chatLog, lastMsg]);
    // }, [lastMsg]);
    //
    // useEffect(() => {
    //     setIsConnected(true);
    //     return () => {
    //         setIsConnected(false);
    //         socket.emit('close', id, info.name);
    //         socket.off('login');
    //         socket.off('user joined');
    //         socket.off('message');
    //         socket.off('user left');
    //     };
    // }, []);
    //
    // const sendMsg = ()=>{
    //     socket.emit('new message', inputMsg);
    //     setLastMsg(inputMsg);
    //     setInputMsg('');
    // };

    /** Fetch info. */
    useEffect(() => {
        if (isSuccess(infoBranch)) {
            socket.send(JSON.stringify({ type: 'add user', room: id, username: info.name }));
            socket.onmessage = info => {
                const data = JSON.parse(info.data as string);
                if (data.type === 'login') {
                    setLastMsg({ last: `You are joined! Users number: ${data.numUsers}` });
                }
                if (data.type === 'user joined') {
                    setLastMsg({ last: `${data.username} joined. Users number: ${data.numUsers}` });
                }
                if (data.type === 'user left') {
                    setLastMsg({ last: `${data.username} left. Users number: ${data.numUsers}` });
                }
                if (data.type === 'new message') {
                    setLastMsg({ last: `${data.username}: ${data.message}` });
                }
            };
        }
    }, [infoBranch, info.name, id]);

    useEffect(() => {
        setChatLog([...chatLog, lastMsg.last]);
    }, [lastMsg]);

    useEffect(() => {
        setIsConnected(true);
        return () => {
            setIsConnected(false);
            socket.send(JSON.stringify({ type: 'disconnect' }));
        };
    }, []);

    const sendMsg = () => {
        socket.send(JSON.stringify({ type: 'new message', message: inputMsg }));
        setLastMsg({ last: `You: ${inputMsg}` });
        setInputMsg('');
    };

    return (
        <ErrorBoundary>
            <div className="main-panel">
                {isInfoLoading ? (
                    <Loading />
                ) : (
                    <div>
                        {chatLog.map((str, i) => (
                            <div key={i}>{str}</div>
                        ))}
                        <div>
                            <input type="text" value={inputMsg} onChange={event => setInputMsg(event.target.value)} />
                            <button onClick={sendMsg}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

ChatPageComponent.displayName = 'ChatPage';

const ChatPageConnected = withRouter(ChatPageComponent);

export { ChatPageConnected as ChatPage };
