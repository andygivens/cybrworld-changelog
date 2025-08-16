import React, { useState } from 'react';

const ssoTypes = [
  { value: 'saml', label: 'SAML 2.0' },
  { value: 'oidc', label: 'OpenID Connect' },
];

const nameIdFormats = [
  'email', 'persistent', 'transient', 'unspecified'
];

function CyberArkSSOConfig({ setAlert }) {
  const [ssoType, setSsoType] = useState('saml');
  const [fields, setFields] = useState({
    entityId: '',
    ssoUrl: '',
    cert: '',
    spEntityId: '',
    acsUrl: '',
    nameIdFormat: 'email',
    clientId: '',
    clientSecret: '',
    authEndpoint: '',
    tokenEndpoint: '',
    jwksUri: '',
    redirectUri: '',
    scopes: 'openid email profile',
    logoutUrl: '',
    attributeMapping: [{ cyberark: '', app: '' }],
    jit: false,
    mfa: false,
  });

  const handleField = (e) => {
    const { name, value, type, checked } = e.target;
    setFields(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMappingChange = (idx, key, value) => {
    setFields(f => {
      const mapping = [...f.attributeMapping];
      mapping[idx][key] = value;
      return { ...f, attributeMapping: mapping };
    });
  };

  const addMapping = () => {
    setFields(f => ({ ...f, attributeMapping: [...f.attributeMapping, { cyberark: '', app: '' }] }));
  };

  const removeMapping = idx => {
    setFields(f => ({ ...f, attributeMapping: f.attributeMapping.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setAlert({ message: 'CyberArk SSO settings saved!', result: 'success' });
  };

  const handleTest = () => {
    setAlert({ message: 'Test connection not implemented.', result: 'warning' });
  };

  return (
    <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.08)', padding: '2rem', maxWidth: 650 }}>
      <h2 style={{ marginBottom: '1.2rem' }}>CyberArk SSO Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Provider</label><br />
          <input type="text" value="CyberArk" readOnly style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', background: '#f8fafd', fontWeight: 600 }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>SSO Type</label><br />
          <select name="ssoType" value={ssoType} onChange={e => setSsoType(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
            {ssoTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        {ssoType === 'saml' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>Identity Provider Entity ID</label><br />
              <input name="entityId" value={fields.entityId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>SSO URL / IdP Login URL</label><br />
              <input name="ssoUrl" value={fields.ssoUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>X.509 Certificate</label><br />
              <textarea name="cert" value={fields.cert} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee', minHeight: 60 }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Service Provider Entity ID</label><br />
              <input name="spEntityId" value={fields.spEntityId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>ACS (Callback) URL</label><br />
              <input name="acsUrl" value={fields.acsUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>NameID Format</label><br />
              <select name="nameIdFormat" value={fields.nameIdFormat} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }}>
                {nameIdFormats.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </>
        )}
        {ssoType === 'oidc' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>Client ID</label><br />
              <input name="clientId" value={fields.clientId} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Client Secret</label><br />
              <input name="clientSecret" value={fields.clientSecret} onChange={handleField} type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Authorization Endpoint</label><br />
              <input name="authEndpoint" value={fields.authEndpoint} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Token Endpoint</label><br />
              <input name="tokenEndpoint" value={fields.tokenEndpoint} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>JWKS URI</label><br />
              <input name="jwksUri" value={fields.jwksUri} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Redirect URI</label><br />
              <input name="redirectUri" value={fields.redirectUri} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Scopes</label><br />
              <input name="scopes" value={fields.scopes} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
            </div>
          </>
        )}
        <div style={{ marginBottom: '1rem' }}>
          <label>Attribute Mapping</label><br />
          {fields.attributeMapping.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <input placeholder="CyberArk Attribute" value={m.cyberark} onChange={e => handleMappingChange(idx, 'cyberark', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
              <span style={{ alignSelf: 'center' }}>→</span>
              <input placeholder="App Field" value={m.app} onChange={e => handleMappingChange(idx, 'app', e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
              <button type="button" style={{ background: '#e3e8ee', border: 'none', borderRadius: 4, padding: '0.3rem 0.7rem' }} onClick={() => removeMapping(idx)}>Remove</button>
            </div>
          ))}
          <button type="button" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 1rem', fontWeight: 600, marginTop: '0.3rem' }} onClick={addMapping}>+ Add Mapping</button>
        </div>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1.5rem' }}>
          <label><input type="checkbox" name="jit" checked={fields.jit} onChange={handleField} /> Enable JIT User Provisioning</label>
          <label><input type="checkbox" name="mfa" checked={fields.mfa} onChange={handleField} /> Enable Multi-Factor Authentication</label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Logout URL (optional)</label><br />
          <input name="logoutUrl" value={fields.logoutUrl} onChange={handleField} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e3e8ee' }} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="button" style={{ background: '#e3e8ee', color: '#333', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 500 }} onClick={handleTest}>Test Connection</button>
          <button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontWeight: 600 }}>Save</button>
        </div>
      </form>
    </div>
  );
}

export default CyberArkSSOConfig;
